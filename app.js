const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const path = require('path')
const methodOverride = require('method-override')
const Campground = require('./models/campground')

// db connection setting
mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Database connected')
})


const app = express()
const port = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true })) 
app.use(methodOverride('_method'))

// application settings
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

// endpoints
app.get('/', (req, res) => {
    res.render('home')
})

app.get('/campgrounds', async (req, res) => {
    const campgrounds = await Campground.find({})
    res.render('campgrounds/index', {campgrounds})
})

app.post('/campgrounds', async (req, res) => {
    const campground = new Campground(req.body.campground)
    await campground.save()
    res.redirect(`/campgrounds/${campground._id}`)
})

app.patch('/campgrounds/:id', async (req, res) => {
    const {id} = req.params
    const campground = await Campground.findByIdAndUpdate(id, {...req.body.campground})
    res.redirect(`/campgrounds/${campground._id}`)

})

app.get('/campgrounds/new', (req, res) => {
    res.render('campgrounds/new')
})

app.get('/campgrounds/:id/edit', async (req, res) => {
    const {id} = req.params
    const campground = await Campground.findById(id)
    res.render('campgrounds/edit', {campground})
})

app.get('/campgrounds/:id', async (req, res) => {
    const {id} = req.params
    const campground = await Campground.findById(id)
    res.render('campgrounds/show', {campground})
})


// listen
app.listen(port, () => {
    console.log('Serving on port 3000')
})