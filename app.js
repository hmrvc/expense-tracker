const express = require('express')
const session = require('express-session')
const { engine } = require('express-handlebars') 
const Record = require('./models/records')
const Category = require('./models/category')
const methodOverride = require('method-override')

const routes = require('./routes')
require('./config/mongoose')
const usePassport = require('./config/passport')

const app = express()
const port = 3000

app.engine('hbs', engine({defaultLayout: 'main', extname: 'hbs'}))
app.set('view engine', 'hbs')
app.use(session({
  secret: 'TTT',
  resave: false,
  saveUninitialized: true
}))

app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))


usePassport(app)
app.use((req, res, next) => {
  //會作用所有路由, 設定成本地變數
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  next()
})
app.use(routes)


app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})
