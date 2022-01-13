const express = require('express')
const router = express.Router()
const Record = require('../../models/records')
const Category = require('../../models/category')


//導向修改頁面
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .lean()
    .then(record => res.render('edit', {record}))
    .catch(error => console.log(error))
})
//送出修改資訊路由
router.put('/:id/edit', (req, res) => {
  const id = req.params.id
  return Record.findByIdAndUpdate(id, req.body)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})
//刪除項目
router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
   .then(record => record.remove())
   .then(() => res.redirect('/'))
   .catch(error => console.log(error))
})
//導向新增頁面
router.get('/create', (req, res) => {
  res.render('create')
})
//送出新增內容
// router.post('/create', (req, res) => {
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
router.post('/create', async (req, res) => {
    const body = req.body
    const categoryObj = await Category.findOne({ category: body.category }).lean()
    await Record.create({ ...body, categoryId: categoryObj._id})
    res.redirect('/')
})

module.exports = router