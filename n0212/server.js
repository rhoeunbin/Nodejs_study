if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const passport = require('passport')
const session = require('express-session')

const initializePassport = require('./passport-config')
initializePassport(
  passport, 
  email => users.find(user => user.email === email)
)

const users = []

app.set('view-engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(flash())
app.user(session({
  secret: process.env.SESSION_SECRET, // env에 secret ksy 넣기
  resave: false,
  saveUninitialized : false
}))
app.use(passport.initialize())
app.use(passport.session())

app.get('/', (req, res) => {
  res.render('index.ejs', { name: 'eunbin'})
})

// 로그인 라우터
// app.get('/login', (req, res) => {
//   res.render('login.ejs')
// })

// passport 설치 후 바꿈
app.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true

}))

// 회원가입 라우터
app.get('/register', (req, res) => {
  res.render('register.ejs')
})

// 회원가입 시
app.post('/register', async(req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    users.push({
      id : Date.now().toString(),
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword
    })
    res.redirect('/login')
  } catch {
      res.redirect('/register')
  }
  console.log(users)
  // req.body.name // name, email, password 다 올 수 있음
})

app.listen(3000)
