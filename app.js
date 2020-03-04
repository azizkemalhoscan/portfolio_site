const express = require('express');
const app = express();

// variable name could be changed if errors occur.
// const data = require('data.json');

// Setting view engine pugs
// app.set('views', path.join(__dirname, 'views'))
app.use(express.static('public'));
app.set('view engine', 'pug');

// I do not understand this part thoroghly. Did we wrote this particular
//code in order to create a fake error or is this a must part of errorhandling
// app.use((req, res, next) => {
//   console.log("Fake error");
//   const err = new Error("Errorrrrrr!");
//   err.status = 500;
//   next(err);
// })
// use a static route and the express.static method to serve the static files located in the public folder


// Index Routing

app.get('/', function (req, res) {
// There should be locals set here;
  console.log("index workss")
  res.render('index', {projects: "I am projects"});
})

app.get('/about', function (req, res) {
  res.render('about')
})


// This should be a dynamic route Id needed.
// Leave it for now.
app.get('/projects', function (req, res) {
  res.render('project')
})

app.use((req, res, next) => {
  const err = new Error("Not found!")
  err.status = 404;
  next(err);
})

app.use('/error',(err, req, res, next) => {
  res.locals.error = err;
  res.status(err.status);
  res.render('error');
  next(err);
})

app.listen(3000, () => {
  console.log("App is listening port 3000");
});
