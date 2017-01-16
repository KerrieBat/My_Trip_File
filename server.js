const express = require('express')
const bodyParser= require('body-parser')
const app = express()
// const mongoose = require("mongoose")
app.use(bodyParser.urlencoded({extended: true}))
app.set('views', './views')
app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'))
app.use('jquery', express.static(__dirname + '/node_modules/jquery/dist/'));

const MongoClient = require('mongodb').MongoClient

var db
var userid
var tripid

// connect to database
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
//
// app.post('/quotes', (req, res) => {
//   db.collection('quotes').save(req.body, (err, result) => {
//     if (err) return console.log(err)
//
//     console.log('saved to database')
//     res.redirect('/')
//   })
// })

// Header nav bar
//home page
app.get('/', (req, res) => {
    res.render('pages/index')
})

// about page
app.get('/about', function(req, res) {
    res.render('pages/about')
})

app.get('/login', function(req, res) {
    res.render('pages/signin')
})

// login and signup page
//if you signin, get details from users about trip and redirect to myTrips
app.get('/signin', (req, res) => {
  db.collection('users').find().toArray(function(err, results) {
    if (err) return console.log(err)
    db.collection('trips').find().toArray(function(err, results) {
      if (err) return console.log(err)
      res.render('pages/myTrips', {
        trips:results
      })
    })
  })
})


//if you register, save details to users and redirect to newTrip
app.post('/signin', (req, res) => {
  db.collection('users').save(req.body, (err, result) => {
    if (err) return console.log(err)
    //pass user id
    var userid =
    console.log('logged in')
    res.render('pages/newTrip')
  })
})

// new trip page
app.get('/new', function(req, res) {
    res.render('pages/newTrip')
})

// edit trips page
// app.get('/edit', function(req, res) {
//   db.collection('quotes').find().toArray(function(err, results) {
//   if (err) return console.log(err)
//   var trips = [
//     { name: 'Europe 2017', days: 12 },
//             { name: 'USA', days: 15 },
//             { name: 'England', days: 10 }
//         ]
//   res.render('pages/editTrip', {
//       trips: trips
//   })
//   })
// })


// view trips page
app.get('/myTrips', function(req, res) {
  db.collection('trips').find().toArray(function(err, results) {
    if (err) return console.log(err)
    res.render('pages/myTrips', {
        trips: results,
    })
  })
})

//myTrips nav bar
// view itinerary page
app.get('/itinerary', function(req, res) {
    res.render('pages/itinerary')
})
app.get('/share', function(req, res) {
    res.render('pages/shareTrip')
})
// app.get('/edit', function(req, res) {
//     res.render('pages/editTrip')
// })

//edit trip and itinerary nav bar
app.get('/flights', function(req, res) {
    res.render('pages/flights')
})
app.get('/accom', function(req, res) {
    res.render('pages/accom')
})
app.get('/car', function(req, res) {
    res.render('pages/car')
})
app.get('/activities', function(req, res) {
    res.render('pages/activities')
})
app.get('/references', function(req, res) {
    res.render('pages/references')
})
app.get('/packing', function(req, res) {
    res.render('pages/packingList')
})
app.get('/share', function(req, res) {
    res.render('pages/shareTrip')
})
app.get('/print', function(req, res) {
    //make it print
    res.render('pages/editTrip')
})
app.get('/return', function(req, res) {
    //
    res.render('pages/itinerary')
})
app.get('/itin', function(req, res) {
    //
    res.render('pages/itinerary')
})
