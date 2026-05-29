const express = require('express');
const router = express.Router();
const db = require('../db');

const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
  });
const bcrypt = require('bcrypt')
const upload = multer({ storage: storage });


router.post('/cadastro', async (req, res) => {
    const { username, email, senha, bio } = req.body;
    const role = 'developer';

    try {
        const senhaCriptografada = await bcrypt.hash(senha, 10);

        const query = 'INSERT INTO users (username, email, password_hash, role, bio) VALUES (?, ?, ?, ?, ?)';
        
        db.query(query, [username, email, senhaCriptografada, role, bio], (err, results) => {
            if (err) {
                console.error('Erro ao criar conta:', err);
                return res.status(500).json({ erro: 'Erro ao criar conta. E-mail ou Utilizador em uso.' });
            }
            res.json({ mensagem: 'Conta criada com segurança!' });
        });
    } catch (erro) {
        console.error('Erro na criptografia:', erro);
        res.status(500).json({ erro: 'Erro interno ao processar a senha.' });
    }
});

//Esse cara Puxa os jogos do banco de dados e retorna para o frontend
router.get('/jogos', (req, res) => {
    const query = 'SELECT * FROM games';
    db.query(query, (err, results) => {
      if (err) {
        console.error('Erro ao buscar jogos:', err);
        res.status(500).json({ error: 'Erro ao buscar jogos' });
        return;
      }
      res.json(results);
    });
  });


  //Pra upload
  router.post('/upload',upload.single('arquivo'), (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: 'Nenhum arquivo enviado' });
    }
    res.json({ message: 'Arquivo enviado com sucesso', file: req.file });
    console.log(req.file);
  })
module.exports = router;
router.post('/login', (req, res) => {
    const{email,senha} = req.body;
    const query = 'SELECT * FROM users WHERE email = ? AND senha = ?';

    db.query(query, [email,senha], (err, results) => {
      if (err) {
        console.error('Erro ao buscar jogos:', err);
        res.status(500).json({ error: 'Erro ao buscar jogos' });
        return;
      }
      if(results.length > 0){
        res.json({message: 'Login bem-sucedido'});
      } else {
        res.status(401).json({message: 'Credenciais inválidas'});
      }
    });
  });