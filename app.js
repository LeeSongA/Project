const express = require('express');
const path = require('path');
const app = express();
app.use(express.static(path.join(__dirname, '')));
app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '', 'intro.html'));
});
app.post('/login', (req, res) => {
	var query = req.query;
	console.log(query.id);
	console.log(query.pwd);
	res.send("You enter the wrong ID or PASSWORD!");
	//디비 비교
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