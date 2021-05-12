const express = require('express')
const path = require('path')
const app = express()
const port = 3000

// application settings
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

// endpoints
app.get('/', (req, res) => {
    res.render('home')
})

// listen
app.listen(port, () => {
    console.log('Serving on port 3000')
})