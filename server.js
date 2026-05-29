
const express = require('express')
const path = require('node:path')
const app = express()
const port = 3000
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

const db = require('./db');
const apiRouter = require('./routes/api');

//Atualizar essa parte conforme vamos desenvolvendo as rotas da API
app.use(express.json());
app.use('/api', apiRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})