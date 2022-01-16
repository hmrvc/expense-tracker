const express = require('express')
const router = express.Router()
const Record = require('../../models/records')
const Category = require('../../models/category')


//導向修改頁面
router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Record.findOne({_id, userId})
    .lean()
    .then(record => res.render('edit', {record}))
    .catch(error => console.log(error))
})
//送出修改資訊路由
router.put('/:id/edit', (req, res) => {
  //加入目前使用者id
  const userId = req.user._id
  const _id = req.params.id
  //找出更改後的category項目
  return Category.findOne({ name: req.body.category})
    .lean()
  //findOneAndUpdate 第一次參數為條件第二個為更新物件
    .then(categoryObj => {
      return Record.findOneAndUpdate({_id, userId},{...req.body, categoryId: categoryObj._id})
      .then(() => res.redirect('/'))
      .catch(error => console.log(error))
})})
//刪除項目
router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Record.findOne({_id, userId})
   .then(record => record.remove())
   .then(() => res.redirect('/'))
   .catch(error => console.log(error))
})
//導向新增頁面
router.get('/create', (req, res) => {
  res.render('create')
})
//送出新增內容
router.post('/create', (req, res) => {
  const userId = req.user._id
  return Category.findOne({name: req.body.category})
    .lean()
    .then(categoryObj => {
      return Record.create({userId, ...req.body, categoryId: categoryObj._id})
      .then(() => res.redirect('/'))
      .catch(error => console.log(error))
    })
})

//待
// router.post('/create', async (req, res) => {
//     const userId = req.user._id
//     const body = req.body
//     const categoryObj = await Category.findOne({ category: body.category }).lean()
//     await Record.create({ ...body, categoryId: categoryObj._id, userId})
//     res.redirect('/')
// })

module.exports = router