const express = require('express')
const router = express.Router()
const Record = require('../../models/records')
const Category = require('../../models/category')

//預覽全部項目
router.get('/', (req, res) => {
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



module.exports = router