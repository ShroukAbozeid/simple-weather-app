const fs = require('fs')
const request = require('request')


const geocode = (address, callback) => {
    const keys = JSON.parse(fs.readFileSync('api_keys.json').toString())
    const mapUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=' + keys.map_api + '&limit=1'
    request({url: mapUrl, json: true}, (error, response) => {
      if (error) {
        callback('unable to connect to location service')
      } else if (response.body.features.length === 0) {
        callback('unable to find location , try another search')
      } else {
        callback(undefined, {
          latitude: response.body.features[0].center[1],
          longitude: response.body.features[0].center[0],
          place_name: response.body.features[0].place_name})
      }
    })
  
  }

  module.exports = geocode