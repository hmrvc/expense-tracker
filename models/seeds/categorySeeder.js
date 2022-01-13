const db = require('../../config/mongoose')
const Category = require('../category')
const categoryData = require('./category.json')

db.once('open', () => {
  Category.insertMany(categoryData)
  .then(() => console.log('category seeder sucess'))
  .catch(error => console.log(error))
  .finally(() => process.exit())
})