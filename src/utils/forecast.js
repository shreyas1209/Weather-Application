const request = require('postman-request');

const forecast = (latitude,longitude,callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=47aa2bad2bd86a1e862f13d0a3ab1eb2&query='+encodeURIComponent(latitude)+','+encodeURIComponent(longitude)

    request({url, json:true}, (err,{ body })=>{
        if(err){
            callback("Unable to access weather data",undefined)
        }else if(body.error){
            callback("Unable to find location",undefined)
        }else{
            
            data = {
                description: body.current.weather_descriptions[0],
                currentTemp: body.current.temperature,
                feelsLike: body.current.feelslike

            }
            callback(undefined,data);
        }
        
    });
}

module.exports= forecast;
