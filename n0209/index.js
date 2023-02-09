// var figlet = require('figlet');

// figlet('Hello World!!', function(err, data) {
//     if (err) {
//         console.log('Something went wrong...');
//         console.dir(err);
//         return;
//     }
//     console.log(data)
// });

// _   _      _ _        __        __         _     _ _ _
// | | | | ___| | | ___   \ \      / /__  _ __| | __| | | |
// | |_| |/ _ \ | |/ _ \   \ \ /\ / / _ \| '__| |/ _` | | |
// |  _  |  __/ | | (_) |   \ V  V / (_) | |  | | (_| |_|_|
// |_| |_|\___|_|_|\___/     \_/\_/ \___/|_|  |_|\__,_(_|_)

// const express = require('express')
// const app = express()

// app.get('/', function (req, res) {
//   res.send('Hello World')
// })

// app.listen(3000)

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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

setTimeout(()=>{console.log("5초지남")},5000) // 콜백함수