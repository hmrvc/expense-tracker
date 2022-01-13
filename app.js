const express = require('express')
const { engine } = require('express-handlebars') 


const app = express()
const port = 3000

app.engine('hbs', engine({defaultLayout: 'main', extname: 'hbs'}))
app.set('view engine', 'hbs')

app.get('/', (req, res) => {
  res.render('index')
})

app.get('/edit', (req, res) => {
  res.render('edit')
})
app.get('/create', (req, res) => {
  res.render('create')
})

app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})
