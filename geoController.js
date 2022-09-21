const geocoder = require('geocoder');
const fetch = import('node-fetch');

const geoController = {};

geoController.geoQuery = (req, res, next) => {
  const { lat, lng } = req.body;
  //console.log(req.body)
  geocoder.reverseGeocode(lat, lng, 
    (err, data) => {
      if (err) {
        const defaultErr = {
          log: 'geoController.geoQuery',
          message: {err: 'super bummed on your error bro'}
        };
        return next(defaultErr);
      }
      //console.log(data.results[0].geometry);
      res.locals.geoinfo = data.results[0].formatted_address;
      console.log(res.locals.geoinfo);
      next();
      return;
    }, 
    {key:'${API_KEY}'}
  );

} //geoQuery

geoController.weatherReport = (req, res, next) => {
  const { lat, lng } = req.body;
  const API_KEY = '${API_KEY}';
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}`)
    .then(data => {
      console.log(data);
      next();
    })
    .catch(err => console.log(err));
   
}

module.exports = geoController;

// SQL query optimization