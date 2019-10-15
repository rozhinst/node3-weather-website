const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forcast')


const app = express()
const port = process.env.PORT || 3000;


const publicDirextoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.use(express.static(publicDirextoryPath))
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


app.get('',(req, res) =>{
    res.render('index',{
        title: 'Weather',
        name: 'Rozhin Sattarpour'
    })
})
app.get('/about',(req, res) =>{
    res.render('about',{
        title: 'About me',
        name: 'Rozhin Sattarpour'
    })
})

app.get('/help',(req, res) =>{
    res.render('help',{
        title: 'Help',
        explanation: 'Page to ask your questions',
        name: 'Rozhin Sattarpour'
    })
})

app.get('/help/*', (req, res) => {
    res.render('error',{
        title: 'Error',
        message: 'Help Article not found!',
        name: 'Rozhin Sattarpour'
    })
})


app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'   
        })
    }
     geocode(req.query.address,(error,{latitude, longitude, location} = {})=>{
    
        if(error){
            return res.send({
                error: error   
            })
        }
        forecast(latitude,longitude,(error,forecastData) =>{
            if(error){
                 return res.send({
                error: error   
            })
            }
            res.send({
                forecast: forecastData,location,
                address: req.query.address
            })
            
        })
    
    })
})

app.get('/product', (req, res) => {
   if(!req.query.search){
       return res.send({
           error: 'You must provide a search'   
       })
   }
   console.log(req.query.search);
   res.send({
       products: []
   })
   
})

app.get('*', (req, res) => {
    res.render('error',{
        title: 'Error',
        message: '404 not found!',
        name: 'Rozhin Sattarpour'
    })
})


app.listen(port, ()=>{
    console.log("Server up on port " + port);
    
})