## 회원가입, 로그인, 로그아웃 기능 만들기

> passport.js 로컬 인증 방식 사용해서 
>
> [유튜브 강의 활용](https://www.youtube.com/watch?v=-RCnNyD0L-s)



### 회원가입, 로그인 기능

`npm init`

`npm i express ejs` : 로그인 npm ( **HTML 안에서 JavaScript 같이 쓸 수 있음**)

`npm i --save-dev nodemon dotenv` : npm module 저장



```json
// package.json에서 

"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },

// 로 바꾸기
"scripts": {
    "devStart": "nodemon server.js"
  },
```

`npm run devStart`

같은 파일 안에 새 문서 views를 만들고 그 안에 index.ejs 파일을 만든다.



```js
// server.js

// express 라이브러리 추가
const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.render('index.ejs')
})

app.listen(3000)
```



```ejs
<!-- index.ejs -->

<h1>hihi</h1>
```

*localhost:3000을 실행시키면 hihi를 볼 수 있음*



```js
// server.js

const express = require('express')
const app = express()

app.set('view-engine', 'ejs')

app.get('/', (req, res) => {
  res.render('index.ejs', { name: 'eunbin'})
})

app.listen(3000)
```



```ejs
<!-- index.ejs -->

<h1>hihi <%= name %></h1>
```

*localhost:3000을 실행시키면 hihi eunbin를 볼 수 있음*



*login.ejs와 register.ejs 파일을 만들고*

```js
// server.js

const express = require('express')
const app = express()

app.set('view-engine', 'ejs')

app.get('/', (req, res) => {
  res.render('index.ejs', { name: 'eunbin'})
})

// 로그인 라우터
app.get('/login', (req, res) => {
  res.render('login.ejs')
})

// 회원가입 라우터
app.get('/register', (req, res) => {
  res.render('register.ejs')
})

app.listen(3000)
```



```ejs
<!-- register.ejs -->

<h1>register</h1>
<form action="/register" method="POST">
  <div>
    <label for="name">Name</label>
    <input type="text" id="name" name="name" 
    required>
  </div>
  <div>
    <label for="email">email</label>
    <input type="email" id="email" name="email" 
    required>
  </div>
  <div>
    <label for="password">password</label>
    <input type="password" id="password" name="password" 
    required>
  </div>
  <button type="submit">Register</button>
</form>
<a href="/login">login</a>
```



```ejs
<!-- login.ejs -->

<h1>Login</h1>
<form action="/login" method="POST">
  <div>
    <label for="email">email</label>
    <input type="email" id="email" name="email" 
    required>
  </div>
  <div>
    <label for="password">password</label>
    <input type="password" id="password" name="password" 
    required>
  </div>
  <button type="submit">Login</button>
</form>
<a href="/register">Register</a>
```



```js
// server.js

const express = require('express')
const app = express()

app.set('view-engine', 'ejs')
// 새로 추가
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
  res.render('index.ejs', { name: 'eunbin'})
})

// 로그인 라우터
app.get('/login', (req, res) => {
  res.render('login.ejs')
})

// 회원가입 라우터
app.get('/register', (req, res) => {
  res.render('register.ejs')
})

// 새로 추가
app.post('/register', (req, res) => {
  req.body.name // name, email, password 다 올 수 있음
})

app.listen(3000)
```



### body-parser

> 요청의 본문에 있는 데이터를 해석해서 req.body 객체로 만들어주는 미들웨어

- 보통 form 데이터나 AJAX 요청의 데이터를 처리
- 단, multipart(이미지, 동영상, 파일) 데이터는 처리하지 못합니다. multipart 데이터는 multer 모듈을 사용하면 된다.



```js
app.use(express.json());
 
app.use(express.urlencoded({extended: true}));
```





**app.use(express.urlencoded({ extended: false }))**

=> extended 옵션의 경우

- true일 때, 객체 형태로 전달된 데이터 내에서 또다른 중첩된 객체를 허용
- false인 경우에는 허용하지 않는다는 의미

**bodyParser 미들웨어의 여러 옵션 중에 하나로 false 값일 때 node.js에 기본으로 내장된 queryString, true 값일 시 따로 설치가 필요한 npm qs 라이브러리를 사용한다.**



### 암호화된 비밀번호 만들기

`npm i bcrypt`



```js
// server.js

const express = require('express')
const app = express()
// 추가
const bcrypt = require('bcrypt')

const users = []

// 생략

// 회원가입 시
app.post('/register', async(req, res) => {
  try {
    const hashedPassword = awaitbcrypt.hash(req.body.password, 10)
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
```



```
console에 찍힘
[
  {
    id: '1676208100965',
    name: 'sfg',
    email: 'dsf@qwr',
    password: '$2b$10$mw4bOBccpR0KmBedIBRP1.cFWSAW7dpcDyCQ2kXi1IQtCGx.9tzOq'
  } => 비밀번호는 암호화 되어 있음
```



### 로그인 상태 관리 npm => passport

`npm install passport passport-local express-flash`

```js
// passport-config.js 파일 만들기

function initializer() {
  
}
```



```js
// server.js

// 추가
const initializePassport = require('./passport-config')
initializePassport(passport)
```



```js
// passport-config.js

const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

function initialize(passport, getUserByEmail, getUserById) {
  const authenticateUser = async (email, password, done) => {
    const user = getUserByEmail(email)
    if (user == null) {
      return done(null, false, { message: 'No user with that email '})
    }

    try {
      if (await bcrypt.compare(password, user.password)) {
        return done(null, user)
      } else {
        return done(null, false, { message: 'Password incorrect' })
      }
    } catch (e) {
      return done(e)
    }
  }
  passport.use(new LocalStrategy({ usernameField: 'email' },
  authenticateUser))
  passport.serializeUser((user, done) => done(null, user.id))
  passport.deserializeUser((id, done) => {
    return done(null, getUserById(id))
  })
}

module.exports = initialize
```



*flash와 session 추가*

```js
// server.js

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')

const initializePassport = require('./passport-config')
initializePassport(
  passport, 
  email => users.find(user => user.email === email),
  id => users.find(user => user.id === id)
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

// passport 설치 후 추가
app.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true

}))

```



```ejs
<!-- login.ejs -->

<h1>Login</h1>
<% if (messages.error) { %>
  <%= messages.error %>
<% } %>
<link rel="shortcut icon" href="#">
<form action="/login" method="POST">
  <div>
    <label for="email">email</label>
    <input type="email" id="email" name="email" 
    required>
  </div>
  <div>
    <label for="password">password</label>
    <input type="password" id="password" name="password" 
    required>
  </div>
  <button type="submit">Login</button>
</form>
<a href="/register">Register</a>
```



```js
// server.js

app.get('/', (req, res) => {
  res.render('index.ejs', { name: req.user.name})
})

//위에서 아래 코드로 변경 =>  인증 체크
app.get('/', checkAuthenticated, (req, res) => {
  res.render('index.ejs', { name: req.user.name})
})

// function 추가
function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }

  res.redirect('/login')
}
```





```js
// server.js

app.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}))
//위에서 아래 코드로 변경 => 인증되지 않은 경우
// 로그인 라우터
app.get('/login', checkNotAuthenticated, (req, res) => {
  res.render('login.ejs')
})

// passport 설치 후 
app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}))

// 회원가입 라우터
app.get('/register', checkNotAuthenticated, (req, res) => {
  res.render('register.ejs')
})

// function 추가
function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/')
  }
  next()
}
```

**이 과정을 거친 뒤 회원가입, 로그인을 하고 /login, /register을 해도 로그인 화면 그대로 유지**



### logout 기능

```js
// server.js

// 오류나는 코드
// app.delete('/logout', (req, res) => {
//   req.logOut()
//   res.redirect('/login')
// })

app.delete('/logout', (req, res, next) => {
  req.logOut((err) => {
    if (err) {
      return next(err)
    }
    res.redirect('/login')
  })
})
```



`npm i method-override`

```js
// server.js

//method-override 라이브러리 추가
const methodOverride = require('method-override')

app.use(methodOverride('_method'))
```

