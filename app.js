const express = require('express');
const app = express();

// variable name could be changed if errors occur.
const {projects} = require('./data.json');

// Setting view engine pugs
// app.set('views', path.join(__dirname, 'views'))
app.use('/static', express.static('public'));
// app.use('/static', express.static('images'));
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
// I DONT KNOW HOW TO DEFINE LOCALS
  // res.locals.projects = data.projects;
  console.log("index workss");
  res.render('index', {projects});
})

app.get('/about', function (req, res) {
  res.render('about')
})


// This should be a dynamic route Id needed.
// Leave it for now.
// CONSIDER THIS CODE AGAIN/ SHOULD IT BE HERE OR ALL ROUTES SHOULD BE IN A DIFFERENT FOLDER. or is it even true :)
app.get('/projects/:id', function (req, res, next) {
  const projectId = req.params.id;
  const project = projects.find(({id}) => id === projectId);
  if(project){
    res.render('project', {project})
  } else {
    res.sendStatus(404);
  }
})

app.use((req, res, next) => {
  const err = new Error("There is no such url BABE!")
  err.status = 404;
  // console.log(err.status);
  next(err);
})

app.use('/error',(err, req, res, next) => {
  res.locals.error = err;
  res.status(err.status);
  res.send('OOOOooopsy sorry an error occured');
  next(err);
})

app.listen(3000, () => {
  console.log("App is listening port 3000");
});
