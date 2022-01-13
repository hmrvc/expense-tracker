const express = require('express')
const session = require('express-session')
const { engine } = require('express-handlebars') 
const Record = require('./models/records')
const Category = require('./models/category')
const methodOverride = require('method-override')

const routes = require('./routes')
require('./config/mongoose')

const app = express()
const port = 3000

app.engine('hbs', engine({defaultLayout: 'main', extname: 'hbs'}))
app.set('view engine', 'hbs')
app.use(session({
  secret: 'TTT',
  resave: false,
  saveUninitial: true
}))

app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.use(routes)


app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})
