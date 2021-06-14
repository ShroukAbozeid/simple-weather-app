const fs = require('fs')
const request = require('request')

const dataBuffer = fs.readFileSync('api_keys.json')
const dataJson = dataBuffer.toString();
const keys = JSON.parse(dataJson)

// geocoding request
const mapUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=" + keys.map_api + '&limit=1'
console.log(mapUrl)
request({url: mapUrl, json: true}, (error, response) => {
    if (error) {
        console.log('Unable to connect to gecoding api')
    } else if (response.body.features.length === 0) {
        console.log('unable to find location , try another search')
    }
    else {
        const info = response.body.features[0]
        const coordinates = info.center
        console.log(info.place_name)
        console.log('lat :', coordinates[1] , ' long : ', coordinates[0])
    }
})


// weather request
const latLng = '37.8267,-122.4233'

const weatherUrl = 'http://api.weatherstack.com/current?access_key=' + keys.weather_api + '&query=' + latLng

request({url: weatherUrl, json: true}, (error, response) => {
    if (error) {
        console.log('Unable to connect to weather api')
    } else if (response.body.error) {
        console.log('unable to find location')
    }
    else {
        const info = response.body.current
        const temp = info.temperature
        const feelslike = info.feelslike
        console.log(info.weather_descriptions[0] + '. Temperature is', temp , ' but it feels like ', feelslike)
    }
})