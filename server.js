const express = require('express');
const bcrypt = require('bcrypt');

const app = express();

const geoController = require('./geoController');

app.use(express.urlencoded({ extended: true}));
app.use(express.json());

app.get('/', (req, res) => {
  res.send("hello sessions tut (or landing page)");
});

app.get('/geocode', 
  geoController.geoQuery,
  (req, res) => {
    // console.log(res.locals.geoinfo);
    res.status(200).json(res.locals.geoinfo);
});

app.get('/weather', 
  geoController.weatherReport,
  (req, res) => {
    res.status(200); //.json(res.locals.crap);
});

app.listen(8080, 
  console.log('server running at http://localhost:8080')
);
