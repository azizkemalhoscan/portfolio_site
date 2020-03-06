// Basic setups.
const express = require('express');
const app = express();

// This is where we get the data to manipulate.
const {projects} = require('./data.json');

// Setting view engine pugs
// app.set('views', path.join(__dirname, 'views'))
app.use('/static', express.static('public'));
// app.use('/static', express.static('images'));
app.set('view engine', 'pug');

// Testing middleware
// app.use((req, res, next) => {
//   console.log("Fake error");
//   const err = new Error("Errorrrrrr!");
//   err.status = 500;
//   next(err);
// })
// use a static route and the express.static method to serve the static files located in the public folder


// Index Routing local are set and sent.

app.get('/', function (req, res) {

  console.log("index workss");
  res.render('index', {projects});
})
// This is for rendering about page when clicked.
app.get('/about', function (req, res) {
  res.render('about')
})

/*
Dynamic routes implemented. Whenever a project selected by the user, projects page will be rendered
specifically for that project.
*/
app.get('/projects/:id', function (req, res, next) {
  const projectId = req.params.id;
  const project = projects.find(({id}) => id === +projectId);
  if(project){
    res.render('project', {project})
  } else {
    res.render('error');
  }
})



// This is an error middleware.
app.use((err, req, res, next) => {
  res.locals.error = err;
  res.status(err.status);
  res.render('error');
  next(err);
})


// This is arrow middleware for handling non-existing url's. --404--
app.use((req, res, next) => {
  const err = new Error("There is no such url BABE!")
  res.locals.error = err;
  err.status = 404;
  res.render('error')
  // console.log(err.status);
  next(err);
})



// This is for defining where to run this page on local server. It is set to 3000.
app.listen(3000, () => {
  console.log("App is listening port 3000");
});
