const express = require('express');
const dataJson = require('./data.json');

// Setting view engine pugs
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug');


// use a static route and the express.static method to serve the static files located in the public folder
app.use(express.static('public'));



// This is for later purposes


