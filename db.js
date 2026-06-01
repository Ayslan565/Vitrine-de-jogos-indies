const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',//Insira seu usuário do MySQL aqui
    password: 'Jjjb3509', //Insira sua senha do MySQL aqui
    database: 'dbgames', //Altere para o nome do seu banco de dados
    port: '3306'//Altere para a sua porta Mysql, se necessário
});

connection.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log('Conectado ao banco de dados MySQL!');
});

module.exports = connection;