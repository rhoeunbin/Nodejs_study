# Nodejs 정리

> [조코딩 강의 보고 정리](https://www.youtube.com/watch?v=Tt_tKhhhJqY)

```js
// HTTP 모듈 코드
var http = require('http');

// HTTP 서버 구성
var server = http.createServer(function(request, response){
  response.writeHead(200,{"Content-Type":"text/plain"});
  response.end("Hello World\n");
});
// 리스터 포트를 8000으로 지정
server.listen(8000);

// 로그 찍기
console.log("Server running at http://localhost:8000/");
```

=> http://localhost:8000/ 로 접속하기



## express 설치

`npm install -g express-generator`

npm install : npm을 설치하는 명령어 => 알아서 nodejs에 설치됨

g : 글로벌로 설치할지 해당 폴더에만 설치할지 선택하는 옵션

express-generator: 익스프레스 프레임워크를 설치하는 명령어



*글로벌 옵션 g: npm 설치 시 (g)의 옵션에 따라 설치 폴더가 달라진다.

글로벌 옵션으로 설치하면 전역에서 사용할 수 있도록 사용자 폴더 아래에 있는 AppData 폴더에 설치하게 되고, 그렇지 않다면 해당 NPM install을 실행하는 폴더에 설치 진행됨





## 프로젝트 만들기

`express gocoder` : 프로젝트 생성 명령어

`cd gocoder` : 생성된 디렉토리로 접근

`npm install` : 'package.json' 파일에 있는 모듈들이 설치될 수 있도로 NPM 설치

=> node_modules 폴더 생성



`npm init` : npm을 시작하겠다 => package.json 생김

`node index.js` : node 파일 실행



package.json => 내용을 대략적으로 확인

package-lock.json => 내용을 상세하게 확인



### npm figlet을 활용한 아스키코드

npm install figlet

```js
var figlet = require('figlet');

figlet('Hello World!!', function(err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log(data)
});

// _   _      _ _        __        __         _     _ _ _
// | | | | ___| | | ___   \ \      / /__  _ __| | __| | | |
// | |_| |/ _ \ | |/ _ \   \ \ /\ / / _ \| '__| |/ _` | | |
// |  _  |  __/ | | (_) |   \ V  V / (_) | |  | | (_| |_|_|
// |_| |_|\___|_|_|\___/     \_/\_/ \___/|_|  |_|\__,_(_|_)
```

npm uninstall figlet



## express 

> node.js 기반의 웹 프레임워크

프레임워크

프론트엔드가 백엔드로 요청(request) 보내면 백엔드가 응답(response)



npm i express



```javascript
const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.listen(3000)
```

localhost3000으로 접근



```javascript
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => { // 기본주소로 들어왔을 때 req=>request res=>response
  res.send('Hello World!') // 콜백함수
})
// get : HTTP 메소드  '/':라우팅   ()=>{}:콜백함수

app.listen(port, () => { // local3000으로 들어오면 
  console.log(`Example app listening on port ${port}`) // 실행하겠다
})
// port : 서버 주소에 있는 일종의 입구 (local3000, 8000) TCP/UPT 포트 규격도 정해져 있음


setTimeout(()=>{console.log("5초지남")},5000) // 콜백함수
```



HTTP 메소드 : 요청의 목적, 종류를 알려주기 위해 사용하는 수단( Get-  주소창 , Host - 주소창 X)

라우팅 : 라우팅에 따라 보여지는게 다름 (/ , /about)

콜백함수 : 함수(끝나고 실행할 함수) // 다른 코드의 인수로서 넘겨주는 실행 가능한 코드



### 예제 API 만들기

```js
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/dog', (req, res) => {
  res.send('강아지')
})

app.get('/cat', (req, res) => {
  res.send('고양이')
})

app.get('/cat', (req, res) => {
  res.send('<h1>고양이</h1>')
})

app.get('/cat', (req, res) => {
  res.send('<a href="https://www.youtube.com/watch?v=Tt_tKhhhJqY&t=401s">')
})

app.get('/dog', (req, res) => {
  res.send({'sound':'강아지'})
})

app.get('/dog', (req, res) => {
  res.json({'sound':'강아지'})
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
```



GET 방식 : params, query



변수를 받는 방식 => 파라미터

```js
app.get('/user/:id', (req, res) => {
  const q = req.params
  console.log(q)
})

// 인터넷 주소에 http://localhost:3000/user/eunbin

// 터미널에
// Example app listening on port 3000
// 5초지남
// { id: 'eunbin' } id라는 변수 이름으로 받을 수 있음
```



```js
// https://www.google.com/search(라우터)?q=sdf(q라는 변수에 sdf라는 값을 넣겠다)

app.get('/user/:id', (req, res) => {
  const q = req.query
  console.log(q)
    
  res.json({'userid': q.id})
})

// http://localhost:3000/user/asdg?q=eunbin&name=eun&age=25
// { q: 'eunbin', name: 'eun', age: '25' }

app.get('/user/:id', (req, res) => {
  const q = req.query
  console.log(q)
  console.log(q.q)
  console.log(q.name)
    
  res.json({'userid': q.name})
})

// 터미널에서
// { q: 'eunbin', name: 'eun', age: '25' }
// eunbin
// eun

// 페이지에서
// {"userid":"eun"}
```





POST 방식 : params, body

```js
app.use(express.json());

app.post('/user/:id', (req, res) => {
    const p = req.params;
    console.log(p);
    const b = req.body;
    console.log(b);
    
    res.send({'message': 'Hello World~~'});
})
```



### 동물소리 API 서버 만들기



```js
app.get('/sound/:name', (req, res) => {
  // const p = req.params
  // port.name
  
  // 더 간단하게 가능
  const { name } = req.params
  console.log(name)
  
  res.json({'sound': '야옹'})
})

// http://localhost:3000/sound/cat
//{"sound":"야옹"}
```



#### API 완성

```js
app.get('/sound/:name', (req, res) => {
  // const p = req.params
  // port.name
  
  const { name } = req.params
  console.log(name)

  if (name == "dog") {
      res.json({'sound': '멍멍'})
  } else if (name == "cat") {
      res.json({'sound': '야옹'})
  } else if (name == "pig") {
      res.json({'sound': '꿀꿀'})
  } else {
      res.json({'sound': '알수없음'})
  }
})
```



**CORS 이슈**

html 파일을 요청했을 때 CORS 설정을 안 하면 차단 당하는 것

**cors를 넣어야 프론트엔드에서 실행했을 때 cors 이슈가 안 생김**



require cors 실행

`npm install cors`

```js
const express = require('express')
var cors = require('cors')
const app = express()
const port = 3000

app.use(cors())
```



```html
<!-- 프론트 엔드  -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>하이하이</title>
</head>
<body>
  <h1 id="sound"></h1>
  <input id="name" type="text">
  <button onclick="getSound()">api요청</button>
  <script>
    function getSound() {    
      const name = document.getElementById('name').value
        fetch(`http://localhost:3000/sound/${name}`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data)
          document.getElementById('sound').innerHTML = data
        });
      }
  </script>
</body>
</html>

```





*💡tip*

*문자열로 `로 감싼 후 ${변수}를 넣으면 문자열에 변수를 넣을 수 있음*
