// index.js
// where your node app starts

// init project
var express = require('express')
var app = express()

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors')
app.use(cors({ optionsSuccessStatus: 200 })) // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'))

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html')
})

// your first API endpoint...
app.get('/api/hello', function (req, res) {
  res.json({ greeting: 'hello API' })
})

app.get('/api/', function (req, res) {
  const date = new Date()

  res.json({
    unix: date.getTime(),
    date: date.toUTCString(),
  })
})

app.get('/api/:date', function (req, res) {
  const unixTimestamp = parseInt(req.params.date, 10)
  if (!isNaN(unixTimestamp) && unixTimestamp >= 0) {
    // Check if it's in a valid range for Unix timestamps (e.g., not too large)
    const date = new Date(req.params.date * 1000)

    const options = {
      weekday: 'short', // Short weekday name (e.g., "Fri")
      day: '2-digit', // Day of the month with leading zeros (e.g., "25")
      month: 'short', // Short month name (e.g., "Dec")
      year: 'numeric', // Full year (e.g., "2015")
      hour: '2-digit', // Hour with leading zeros (e.g., "00")
      minute: '2-digit', // Minute with leading zeros (e.g., "00")
      second: '2-digit', // Second with leading zeros (e.g., "00")
      timeZoneName: 'short', // Short time zone name (e.g., "GMT")
    }

    const formattedDate = date.toLocaleString('en-US', options)
    const unix = date.getTime()

    res.json({
      unix: unix,
      utc: formattedDate,
    })
  }
  const date = new Date(req.params.date)

  const options = {
    weekday: 'short', // Short weekday name (e.g., "Fri")
    day: '2-digit', // Day of the month with leading zeros (e.g., "25")
    month: 'short', // Short month name (e.g., "Dec")
    year: 'numeric', // Full year (e.g., "2015")
    hour: '2-digit', // Hour with leading zeros (e.g., "00")
    minute: '2-digit', // Minute with leading zeros (e.g., "00")
    second: '2-digit', // Second with leading zeros (e.g., "00")
    timeZoneName: 'short', // Short time zone name (e.g., "GMT")
  }

  const formattedDate = date.toLocaleString('en-US', options)
  const unix = date.getTime()

  res.json({
    unix: unix,
    utc: formattedDate,
  })
})

// listen for requests :)
var listener = app.listen(5500, function () {
  console.log('Your app is listening on port ' + listener.address().port)
})
