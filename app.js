const yargs = require('yargs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecasts')

yargs.command({
  command: 'get-forecast',
  describe: 'get weather data for a location',
  builder: {
    name: {
      describe: 'location name',
      demandOption: true,
      type: 'string'
    }
  },
  handler(argv) {
    geocode(argv.name, (error, data) => {
      if(error){
        return console.log('Error', error)
      } 
      location = data.place_name
      forecast(data.latitude, data.longitude, (error, weatherData) => {
        if(error){
         return console.log('Error:', error)
        } 
        console.log('Weather for ', location)
        console.log(weatherData.description)
        console.log('Temperature is ', data.temperature, ' but it feels like ', data.feelslike)
      })
    })
  }
})
yargs.parse()