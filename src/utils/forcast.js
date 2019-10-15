const request = require('request')

const forecast =(latitude,longitude, callback) =>{
    const url = 'https://api.darksky.net/forecast/e01c59eab5ff4d3d59c2854549201d66/' + latitude +',' + longitude

    request({url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect!', undefined)
        }
        else if(!body.daily){
            callback('Unfound Location.Try another search!', undefined)
        }
        else{
            callback(undefined,  body.daily.data[0].summary + "it is " + body.currently.temperature + " There is a " + body.currently.precipProbability + "% of rain.Humidity is  " +  body.daily.data[0].humidity + ".\n\nIcon:\n" +  body.daily.data[0].icon)
        }

    })
}
module.exports = forecast
