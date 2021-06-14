const fs = require('fs')
const request = require('request')

const dataBuffer = fs.readFileSync('api_keys.json')
const dataJson = dataBuffer.toString();
const keys = JSON.parse(dataJson)


const mapUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=" + keys.map_api + '&limit=1'
request({url: mapUrl, json: true}, (error, response) => {
    const info = response.body.features[0]
    const coordinates = info.geometry.center
    console.log(info.place_name + '. lat is', coordinates[0] , ' long ', coordinates[1]
    )
})

const latLng = '37.8267,-122.4233'

const weatherUrl = 'http://api.weatherstack.com/current?access_key=' + keys.weather_api + '&query=' + latLng

request({url: weatherUrl, json: true}, (error, response) => {
    const info = response.body.current
    const temp = info.temperature
    const feelslike = info.feelslike
    console.log(info.weather_descriptions[0] + '. Temp is', temp , ' but it feels like ', feelslike
    )
})