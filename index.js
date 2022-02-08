const http = require('http');
const express = require('express');
const app = express();
const server = http.createServer(app);
require('dotenv').config();
const { PORT } = process.env;
const expressHbs = require('express-handlebars');
const path = require('path');
const homeRoutes = require('./routes/home.routes');

app.engine('hbs', expressHbs.engine({
    defaultLayout: 'main',
    extname: '.hbs',
    layoutsDir: path.join(__dirname, 'views/layouts')
}));

app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(express.static(path.join(__dirname, 'node_modules/bootstrap/dist')));
app.use(express.static(path.join(__dirname, 'node_modules/@fortawesome/fontawesome-pro/js')));
app.use(express.static(path.join(__dirname, 'public')));

app.use(homeRoutes);

server.listen(PORT, () => {
    console.log(`NodeJS server started on port ${PORT}`)
});