const mongoose = require('mongoose')
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/expense-tracker'
mongoose.connect(MONGODB_URI)

const db = mongoose.connection


db.on('error', () => {
  console.log('mongodb connect fail')
})
db.once('open', () => {
  console.log('monogodb connect success')
})

module.exports = db