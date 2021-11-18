'use strict';
let cache = require('./Cache');
const axios = require('axios');

async function weatherData(request, response) {
  let { postal_code } = request.query;
  let weatherUrl = `https://api.weatherbit.io/v2.0/forecast/daily?&postal_code=${postal_code}&units=I&key=${process.env.REACT_APP_WEATHER_API_KEY}`;
  console.log(weatherUrl);

  if (cache[postal_code] &&
    Date.now() - cache[postal_code].timestamp < 1000 * 10) {

    response.status(200).send(cache[postal_code]);
    console.log(cache, 'cache hit');
  }

  else {
    try {
      let weatherData = await axios.get(weatherUrl);
      let weatherObject = weatherData.data;
      console.log(weatherObject)
      const weatherArray = weatherObject.data.map(day => new Forecast(day));
      cache[postal_code] = {
        postal_code: weatherArray,
        timestamp: Date.now()
      };
      console.log('Weather Cache empty');
      response.status(200).send(weatherArray);
    }
    catch (error) {
      response.status(500).send('Unable to get Forecast');
    }
  }
}

class Forecast {
  constructor(day) {
    this.description = `Low of ${day.low_temp}, high of ${day.max_temp} with ${day.weather.description}`;
    this.date = day.valid_date;
  }
}

module.exports = weatherData;