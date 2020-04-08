const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')




const app = express()


//Define Paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


//Set up HBS Engine and View Locations
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


//Set up Static Directy to Serve

app.use(express.static(publicDirectoryPath))




app.get('', (req, res) => {
    res.render('index', { title: 'Weather App!', name: 'Rex Righetti' })
})
app.get('/help', (req, res) => {
    res.render('help', { title: 'Welcome to FAQ', name: 'Rex Righetti' })
})
app.get('/about', (req, res) => {
    res.render('about', { title: 'About this Application', name: 'Rex Righetti' })
})


app.get('/weather', (req, res) => {
    if (!req.query.location) {
        return res.send({
            error: ''
        })
    }
    const address = req.query.location
    geocode(address, (error, { latitude, longitude, location }={}) => {
        if (error) {
            return res.send({error: 'Geocode failed'})
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return console.log({error: 'forcast failed'})
            }
            res.send({
                forcast: forecastData,
                location,
                address: req.query.location})
        })
    })

        
    })

    app.get('/help/*', (req, res) => {
        res.render('404-error', { title: 'Error', name: 'Rex Righetti', error: 'Help Page Not Found' })
    })
    app.get('*', (req, res) => {
        res.render('404-error', { title: 'Error', name: 'Rex Righetti', error: ' Page Not Found' })
    })
    app.listen(3000, () => {
        console.log('Server is running on port 3000')
    })




