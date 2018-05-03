const express = require('express');
const path = require('path');
const app = express();
const mysql = require('mysql');
const db = require('./config.json');

var connection = mysql.createConnection({
  host     : db.host,
  user     : db.user,
  password : db.password,
  database : db.database
});
connection.connect();

app.use(express.static(path.join(__dirname, '')));
app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '', 'intro.html'));
});
app.post('/login', (req, res) => {
	var id = req.query.id;
	var pwd = req.query.pwd;
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
	console.log('Server is working on port 8000!');
});