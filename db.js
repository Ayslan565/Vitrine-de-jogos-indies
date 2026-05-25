const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',//Insira seu usuário do MySQL aqui
    password: '', //Insira sua senha do MySQL aqui
    database: 'indiehub', 
    port: '3306'//Altere para a sua porta Mysql, se necessário
});

db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log('Conectado ao banco de dados MySQL!');
});

module.exports = db;