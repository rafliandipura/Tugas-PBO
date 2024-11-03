const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',       
    user: 'root',    
    password: '', 
    database: 'player'  
});

connection.connect((err) => {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to database as id ' + connection.threadId);
});

module.exports = connection;