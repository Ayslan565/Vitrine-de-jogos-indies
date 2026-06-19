const express = require('express');
const router = express.Router();
const db = require('../db');
const multer = require('multer');
const bcrypt = require('bcrypt');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
});
const upload = multer({ storage: storage });


router.post('/cadastro', async (req, res) => {
    const { username, email, password, bio } = req.body;
    const role = 'developer';

    try {
        const senhaCriptografada = await bcrypt.hash(password, 10);
        const query = 'INSERT INTO users (username, email, password_hash, role, bio) VALUES (?, ?, ?, ?, ?)';
        
        db.query(query, [username, email, senhaCriptografada, role, bio], (err, results) => {
            if (err) {
                console.error('Erro ao criar conta:', err);
                return res.status(500).json({ erro: 'Erro ao criar conta. E-mail em uso.' });
            }
            res.json({ mensagem: 'Conta criada com segurança!' });
        });
    } catch (erro) {
        console.error('Erro na criptografia:', erro);
        res.status(500).json({ erro: 'Erro interno ao processar a senha.' });
    }
});


router.post('/login', (req, res) => {
    const { email, password } = req.body;
    const query = 'SELECT * FROM users WHERE email = ?';

    db.query(query, [email], async (err, results) => {
      if (err) {
        console.error('Erro ao buscar utilizador:', err);
        return res.status(500).json({ error: 'Erro interno no servidor' });
      }
      
      if (results.length > 0) {
        const isMatch = await bcrypt.compare(password, results[0].password_hash);
        
        if (isMatch) {
          req.session.usuarioId = results[0].id;
          res.json({ message: 'Login bem-sucedido' });
        } else {
          res.status(401).json({ message: 'Credenciais inválidas' });
        }
      } else {
        res.status(401).json({ message: 'Credenciais inválidas' });
      }
    });
});


router.get('/perfil', (req, res) => {
    if (!req.session.usuarioId) {
        return res.status(401).json({ error: 'Não logado' });
    }

    const id = req.session.usuarioId;
    const query = 'SELECT username, email, bio FROM users WHERE id = ?';
    
    db.query(query, [id], (err, results) => {
        if (err || results.length === 0) {
            console.error('Erro ao buscar perfil:', err);
            return res.status(500).json({ error: 'Erro ao carregar perfil.' });
        }
        res.json(results[0]);
    });
});


router.get('/jogos', (req, res) => {
    const query = 'SELECT * FROM games';
    db.query(query, (err, results) => {
      if (err) {
        console.error('Erro ao buscar jogos:', err);
        return res.status(500).json({ error: 'Erro ao buscar jogos' });
      }
      res.json(results);
    });
});

router.get('/jogos/:id', (req, res) => {
    const idDoJogo = req.params.id;
    const query = 'SELECT * FROM games WHERE id = ?';
    
    db.query(query, [idDoJogo], (err, results) => {
        if (err) {
            console.error('Erro ao buscar detalhes do jogo:', err);
            return res.status(500).json({ error: 'Erro ao buscar o jogo' });
        }
        
        if (results.length === 0) {
            return res.status(404).json({ error: 'Jogo não encontrado' });
        }
        
        res.json(results[0]);
    });
});


router.get('/meus-jogos', (req, res) => {
    if (!req.session.usuarioId) {
        return res.status(401).json({ error: 'Acesso negado. Faça login.' });
    }

    const idDoDesenvolvedor = req.session.usuarioId;
    const query = 'SELECT * FROM games WHERE developer_id = ?';
    
    db.query(query, [idDoDesenvolvedor], (err, results) => {
        if (err) {
            console.error('Erro ao buscar jogos do utilizador:', err);
            return res.status(500).json({ error: 'Erro no servidor' });
        }
        res.json(results);
    });
});


router.post('/upload', upload.single('arquivo'), (req, res) => {
    if (!req.session.usuarioId) {
        return res.status(401).json({ error: 'Acesso negado. Faça login para publicar jogos.' });
    }

    const { titulo, preco, descricao, url_imagem } = req.body;
    let caminhoImagem = '';

    if (req.file) {
        caminhoImagem = `/uploads/${req.file.filename}`;
    } else if (url_imagem) {
        caminhoImagem = url_imagem;
    } else {
        return res.status(400).json({ error: 'Você deve enviar um arquivo ou colar um link.' });
    }

    const idDoDesenvolvedor = req.session.usuarioId; 
    const query = 'INSERT INTO games (title, preco, description, imagem, developer_id, url) VALUES (?, ?, ?, ?, ?, ?)';    
    
    db.query(query, [titulo, preco, descricao, caminhoImagem, idDoDesenvolvedor, '#'], (err, results) => {
      if (err) {
        console.error('Erro ao criar jogo no BD:', err);
        return res.status(500).json({ error: 'Erro ao salvar os dados do jogo.' });
      }
      res.json({ message: 'Jogo publicado com sucesso!' });
    });
});


router.delete('/apagar-jogo/:id', (req, res) => {
    if (!req.session.usuarioId) {
        return res.status(401).json({ error: 'Acesso negado.' });
    }

    const idDoJogo = req.params.id;
    const idDoDesenvolvedor = req.session.usuarioId;

    const query = 'DELETE FROM games WHERE id = ? AND developer_id = ?';

    db.query(query, [idDoJogo, idDoDesenvolvedor], (err, results) => {
        if (err) {
            console.error('Erro ao apagar jogo:', err);
            return res.status(500).json({ error: 'Erro no servidor' });
        }
        res.json({ message: 'Jogo apagado com sucesso!' });
    });
});
router.put('/editar-jogo/:id', (req, res) => {
    if (!req.session.usuarioId) {
        return res.status(401).json({ error: 'Acesso negado.' });
    }

    const idDoJogo = req.params.id;
    const idDoDesenvolvedor = req.session.usuarioId;
    const { titulo, preco, descricao } = req.body;

    const query = 'UPDATE games SET title = ?, preco = ?, description = ? WHERE id = ? AND developer_id = ?';

    db.query(query, [titulo, preco, descricao, idDoJogo, idDoDesenvolvedor], (err, results) => {
        if (err) {
            console.error('Erro ao editar jogo:', err);
            return res.status(500).json({ error: 'Erro no servidor' });
        }
        res.json({ message: 'Jogo atualizado com sucesso!' });
    });
});
// ==========================================
// EXPORTAÇÃO (SEMPRE A ÚLTIMA LINHA!)
// ==========================================
module.exports = router;
