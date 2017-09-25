var express = require('express');
var app = express();

var PORT = 3000;
var HOST = '0.0.0.0';

app.use(express.static('./'));
app.use(express.static('../dist/js/'));
app.use(express.static('../dist/css/'));
app.use(express.static('../dist/assets'));

app.get('/', function(req, res) {
      res.render('index.html');
});

console.log('Server is activated on '+HOST+':'+PORT);
app.listen(PORT, HOST);

