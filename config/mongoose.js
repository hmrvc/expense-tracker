const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/expense-tracker')

const db = mongoose.connection


db.on('error', () => {
  console.log('mongodb connect fail')
})
db.once('open', () => {
  console.log('monogodb connect success')
})

module.exports = db