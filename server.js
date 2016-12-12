const express = require('express')
const bodyParser= require('body-parser')
const app = express()
app.use(bodyParser.urlencoded({extended: true}))

// All your handlers here...

console.log('may node be with you')

app.listen(8080, function() {
  console.log('listening on 8080')
})

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
  // Note: __dirname is directory that contains the JavaScript source code. Try logging it and see what you get!
})
// Note: request and response are usually written as req and res respectively.
  console.log(__dirname);


app.post('/quotes', (req, res) => {
  console.log(req.body)
})
