const express = require('express')
const { engine } = require('express-handlebars') 
const Record = require('./models/records')
const Category = require('./models/category')
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
  let totalAmount = 0
  Record.find()
  //取得關聯資料庫項目
   .populate('categoryId')
   .lean()
   .then(records => {
     records.forEach(item => {
       totalAmount += item.amount
     })
     res.render('index', {records, totalAmount}
   )})
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
// app.post('/create', (req, res) => {
//   const body = req.body
//   return Category
//     .findOne({name: body.category})
//     .then(category => {
//     return Record.create({...body, categoryId: category._id})
//   })
//     .then(() => res.redirect('/'))
//     .catch(error => console.log(error))
// })

//待
app.post('/create', async (req, res) => {
    const body = req.body
    const categoryObj = await Category.findOne({ category: body.category }).lean()
    await Record.create({ ...body, categoryId: categoryObj._id})
    res.redirect('/')
})

app.get('/user/login', (req, res) => {
  res.render('login')
})

app.get('/user/register', (req, res) => {
  res.render('register')
})



app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})
