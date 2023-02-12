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



login.ejs와 register.ejs 파일을 만들고

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

function initializer(passport, getUserByEmail) {
  const authenticateUser = (email, password, done) => {
    const user = getUserByEmail(email)
    if (user == null) {
      return done(null. false, { message: 'No user with that email '})
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
  passport.use(new LocalStrategy({ usernameField: 'email' }),
  authenticateUser)
  passport.serializerUser((user, done) => { })
  passport.deserializerUser((id, done) => { })
}

module.exports = initialize
```



```js
// server.js

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

// passport 설치 후 바꿈
app.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true

}))

```

