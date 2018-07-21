const express = require('express');
const app = express();
const session = require('express-session');

const path = require('path');
const mysql = require('mysql');
const NodeRSA = require('node-rsa');

const db = require('./config.json');

var connection = mysql.createConnection({
  host     : db.host,
  user     : db.user,
  password : db.password,
  database : db.database
});
connection.connect();

var publicKey;
var privateKey;
var key;

app.use(session({
   secret: '#$@!!$!##$$#!',
   resave: false,
   saveUninitialized: true,
   cookie: { maxAge: 1000 * 60 * 60 }
}));
app.use(express.static(path.join(__dirname, '')));
app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '', 'intro.html'));
});
app.get('/public', (req, res) => {
	res.send(publicKey);
});
app.post('/login', (req, res) => {
	var id = req.query.id;
	var pwd = new Buffer(key.decrypt(req.query.pwd.replace(/ /gi, '+'), 'base64'), 'base64').toString();
	console.log('User "'+id+'" tries to log in our site');
	if(pwd.indexOf("'")<0){
		connection.query("SELECT * from user where id='"+id+"' and pwd='"+pwd+"'", function(err, rows, fields) {
			try{
				console.log('User "'+rows[0].id+'" logs in to our site');
				res.send("OK");
			}catch(exception){
				console.log('User "'+id+'" enters wrong information');
				res.send("You enter the wrong ID or PASSWORD!");
			}
		});
	}else
		res.send("You enter the wrong ID or PASSWORD!");
});
app.post('/main', (req, res) => {
	res.sendFile(path.join(__dirname, '', 'main.html'));
});
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, '', '404.html'));
});
app.listen(8000, () => {
	process.stdout.write('\033c');
	key = new NodeRSA({b: 1024});
	key.setOptions({encryptionScheme: 'pkcs1'});
	privateKey = key.exportKey("pkcs8-private");
	publicKey = key.exportKey("pkcs8-public-pem");
	console.log('Server is working on port 8000!');
	console.log('----------------------------------------------------------------');
	console.log('generated private key▼ '+privateKey.replace(/(-----END PRIVATE KEY-----)|(-----BEGIN PRIVATE KEY-----)/gi, ''));
	console.log('generated public key▼ '+publicKey.replace(/(-----END PUBLIC KEY-----)|(-----BEGIN PUBLIC KEY-----)/gi, ''));
});