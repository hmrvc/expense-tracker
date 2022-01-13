const express = require('express')
const { engine } = require('express-handlebars') 
const Record = require('./models/records')
const methodOverride = require('method-override')

require('./config/mongoose')

const app = express()
const port = 3000

app.engine('hbs', engine({defaultLayout: 'main', extname: 'hbs'}))
app.set('view engine', 'hbs')

app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))



//預覽全部項目
app.get('/', (req, res) => {
  Record.find()
   .lean()
   .then(records => res.render('index', {records}))
   .catch(error => console.log(error))
})

//導向修改頁面
app.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .lean()
    .then(record => res.render('edit', {record}))
    .catch(error => console.log(error))
})
//送出修改資訊路由
app.put('/:id/edit', (req, res) => {
  const id = req.params.id
  return Record.findByIdAndUpdate(id, req.body)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})
//刪除項目
app.delete('/:id', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
   .then(record => record.remove())
   .then(() => res.redirect('/'))
   .catch(error => console.log(error))
})
//導向新增頁面
app.get('/create', (req, res) => {
  res.render('create')
})
//送出新增內容
app.post('/create', (req, res) => {
  Record.create(req.body)
  .then(() => res.redirect('/'))
  .catch(error => console.log(error))
})



app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})
