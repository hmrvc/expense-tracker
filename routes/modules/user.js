const express = require('express')
const router = express.Router()
const User = require('../../models/user')

//導向登入頁面
router.get('/login', (req, res) => {
  res.render('login')
})

//導向註冊頁面
router.get('/register', (req, res) => {
  res.render('register')
})

//取得註冊頁面資料 做到這裡
router.post('/register', (req, res) => {
  const {name, email, password, confirmPassword} = req.body
  User.findOne({email}).then(user => {
    if (user) {
      console.log('User is already exist.')
      res.render('register', {
        name,
        email,
      })
    } else {
      return User.create({
        name,
        email,
        password
      })
      .then(() => res.redirect('/'))
      .catch(error => console.log(error))
    }
  })

})

module.exports = router