const db = require('../../config/mongoose')
const User = require('../user')
const Record = require('../records')
const bcrypt = require('bcryptjs')
const Category = require('../category')

const SEED_USER = [{
  name: 'user1',
  email: 'user1@example.com',
  password: '12345'
}]
const SEED_RECORD = [{
  name: '日用品',
  date: '2021-01-25',
  category: '家居物業',
  amount: '230'
}]

db.once('open', async() => {

  //完成全部陣列內容才繼續then
  await Promise.all(SEED_USER.map(async(seed) => {
    const {name, email, password} = seed
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    const user = await User.create({name, email, password: hash})
    
    SEED_RECORD.forEach(async(item) => {
      const category = await Category.findOne({category: item.category})
      const categoryId = category._id
      item['categoryId'] = await categoryId
      await Record.create({userId: user._id, ...item})
    })
  }))
  .then(() => {
    console.log('user seed done')
    // process.exit()
  })
  .finally(() => process.exit())
  .catch(error => console.log(error))



  
  

})