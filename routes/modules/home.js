const express = require('express')
const router = express.Router()
const Record = require('../../models/records')
const Category = require('../../models/category')

//預覽全部項目
router.get('/', (req, res) => {
  const userId = req.user._id
  let totalAmount = 0
  Record.find({ userId })
  //取得關聯資料庫項目
   .populate('categoryId')
   .lean()
   .sort({ _id: 'asc'})
   .then(records => {
     records.forEach(item => {
       totalAmount += item.amount
     })
     res.render('index', {records, totalAmount}
   )})
   .catch(error => console.log(error))
})

//預覽選擇的類別
router.get('/search', (req, res) => {
  const userId = req.user._id
  let totalAmount = 0
  const categorySet = req.query.category
  return Record.find({ category: categorySet })
    .lean()
  //取得關聯資料庫項目
    .populate('categoryId')
    .sort({ _id: 'asc'})
    .then(records => {
      records.forEach(item => {
        totalAmount += item.amount
      })
      res.render('index', {records, totalAmount, categorySet}
    )})
    .catch(error => console.log(error))
})


module.exports = router