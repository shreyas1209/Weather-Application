const path = require('path')
const express = require('express');
const hbs = require('hbs')

const app = express();

const geocoding = require('./utils/geocoding.js')
const forecast = require('./utils/forecast.js')

//Define paths for express config
const publicPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//Setup for static directory to serve
app.use(express.static(publicPath))



app.get('',(req,res)=>{
    res.render('index',{
        title:"Weather Application",
        content:"Created by Shreyas Sesham"
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:"About",
        content:"Created by Shreyas Sesham"
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title:"Help",
        helpNote:"This page gives help for something",
        content:"Created by Shreyas Sesham"
    })
})


app.get('/weather',(req,res)=>{

    if(!req.query.address){
        return res.send({
            error:"You must provide an address term"
        })
    }
    const address = req.query.address
    geocoding(address,(err,{latitude,longitude,location}={})=>{
        if(err){
            return res.send({err})
        }else{
            forecast(latitude,longitude,(err,{description,currentTemp,feelsLike})=>{
                if(err){
                    return res.send({err})
                }else{
                    return res.send({
                        forecast:(description+' weather at '+location+'. Current Temperature is ' +currentTemp+' degrees celsius.'+' Feels Like '+feelsLike+' degrees celsius.'),
                        location,
                        address})
                }
            })
    
        }
    
    })

})

app.get('/help/*',(req,res)=>{
    res.render('error',{
        title:"404",
        content:"Created by Shreyas Sesham",
        errorMessage:"Help Article Not Found!!!"


    })
})

app.get('*',(req,res)=>{
    res.render('error',{
        title:"404",
        content:"Created by Shreyas Sesham",
        errorMessage:"Page Does Not Exist!!!"


    })
})

app.listen(3000,()=>
{
    console.log('Server is up on port 3000')
})