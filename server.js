const express = require('express');
const session = require('express-session');
const path = require('node:path');
const apiRouter = require('./routes/api'); 

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: 'chave_secreta_indiehub_2026', 
    resave: false,
    saveUninitialized: false,
    cookie: { 
        maxAge: 1000 * 60 * 60 
    }
}));

app.use('/api', apiRouter);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(` Servidor IndieHub a rodar perfeitamente na porta ${port}`);
});