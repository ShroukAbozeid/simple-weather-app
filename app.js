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
    geocode(argv.name, (error, {latitude, longitude, place_name}={}) => {
      if(error){
        return console.log('Error', error)
      } 
      forecast(latitude, longitude, (error, {description, temperature, feelslike}={}) => {
        if(error){
         return console.log('Error:', error)
        } 
        console.log('Weather for ', place_name)
        console.log(description)
        console.log('Temperature is ', temperature, ' but it feels like ', feelslike)
      })
    })
  }
})
yargs.parse()