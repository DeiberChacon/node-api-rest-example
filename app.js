var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var methodOverride = require('method-override')
var mongoose = require('mongoose')

// Connection to db
mongoose.connect('mongodb://localhost/tvshows', function (err, res) {
  if (err) throw err
  console.log('Connected to database')
})

// Middlewares
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(methodOverride())

// Import models and controllers
var models = require('./models/tvshow')(app, mongoose)
var TVShowCtrl = require('./controllers/tvshows')

// Router example
var router = express.Router()
router.get('/', function (req, res) {
  res.send('Hello world!')
})
app.use(router)

// API Routes
var tvshows = express.Router()

tvshows.route('/tvshows')
  .get(TVShowCtrl.findAllTVShows)
  .post(TVShowCtrl.addTVShow)

tvshows.route('/tvshows/:id')
  .get(TVShowCtrl.findById)
  .put(TVShowCtrl.updateTVShow)
  .delete(TVShowCtrl.deleteTVShow)

app.use('/api', tvshows)

app.listen(3000, function () {
  console.log('Node server running on http://localhost:3000')
})
