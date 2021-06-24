const fs = require('fs')
const request = require('request')

const forecast = (latitude, longitude, callback) => {
  const keys = JSON.parse(fs.readFileSync('api_keys.json').toString())
  const latLng = latitude + ',' + longitude
  const weatherUrl = 'http://api.weatherstack.com/current?access_key=' + keys.weather_api + '&query=' + latLng + '&units=f'
  request({url: weatherUrl, json: true}, (error, {body}={}) => {
    if (error) {
      callback('Unable to connect to weather api')
    } else if (body.error) {
      callback('unable to find location')
    }
    else {
      const info = body.current
      callback(undefined, {
        description: info.weather_descriptions[0],
        temperature: info.temperature,
        feelslike: info.feelslike
      })   
    }
  })
}

  module.exports = forecast