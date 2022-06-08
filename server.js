require('./models/DBconfig');
const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const bodyparser = require('body-parser');

const empController = require('./controllers/empController');

var app = express();
app.use(bodyparser.urlencoded({
    extended: true
}));

// file static path
app.use('/static', express.static(path.join(__dirname, 'assets/')));

app.use(bodyparser.json());
app.set('views', path.join(__dirname, '/views/'));
app.engine('hbs', exphbs({ extname: 'hbs', defaultLayout: 'mainLayout', layoutsDir: __dirname + '/views/templates/' }));
app.set('view engine', 'hbs');



app.get('/', (req, res) => {
    res.render('index');
});
app.use('/employee', empController);
app.listen(3000, () => {
    console.log('Server in ascolto sulla porta : 3000');
});