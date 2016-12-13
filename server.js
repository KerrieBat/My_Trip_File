const express = require('express')
const bodyParser= require('body-parser')
const app = express()
app.use(bodyParser.urlencoded({extended: true}))
app.set('views', './views')
app.set('view engine', 'ejs')

const MongoClient = require('mongodb').MongoClient
// connect to database
var db
MongoClient.connect('mongodb://kerriebat:test@ds061206.mlab.com:61206/my_trip_file', (err, database) => {
  // ... start the server, do something here

  if (err) return console.log(err)
  db = database
  app.listen(8080, function() {
    console.log('listening on 8080')
  })
})


// All your handlers here...
console.log('may node be with you')
// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/index.html')
//   // Note: __dirname is directory that contains the JavaScript source code. Try logging it and see what you get!
// })
// // Note: request and response are usually written as req and res respectively.
//   console.log(__dirname);

app.post('/quotes', (req, res) => {
  db.collection('quotes').save(req.body, (err, result) => {
    if (err) return console.log(err)

    console.log('saved to database')
    res.redirect('/')
  })
})
//home page
app.get('/', (req, res) => {

    // send HTML file populated with quotes here
    res.render('pages/index')
})

// about page
app.get('/about', function(req, res) {
    res.render('pages/about')
})

// edit trip page
app.get('/edit', function(req, res) {
  db.collection('quotes').find().toArray(function(err, results) {
  if (err) return console.log(err)
  var trips = [
    { name: 'Europe 2017', days: 12 },
            { name: 'USA', days: 15 },
            { name: 'England', days: 10 }
        ]
  var tagline = "Any code of your own that you haven't looked at for six or more months might as well have been written by someone else.";


    res.render('pages/edit_trip', {
        quotes: results,
        trips: trips,
        tagline: tagline
    })
  })
})
