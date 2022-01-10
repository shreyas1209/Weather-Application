const request = require('postman-request');

const geocoding = (address,callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1Ijoic2hyZXlhczEyMDkiLCJhIjoiY2t5MnRqeXhiMGp6cjJzbnk0NGc5ZDFnYiJ9.5N7O45f_C2Y4m9tDgAnx1A'
    request({url, json:true}, (err,{ body })=>{
        if(err){
            callback("Unable to connect to location services",undefined);
        }else if(body.features.length === 0){
            callback("Unable to find location.Try another search.",undefined);
        }else{
            const data = {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name

            }
            
            callback(undefined,data);

        }
        
    });


}

module.exports = geocoding;