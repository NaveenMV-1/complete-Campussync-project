const mysql2 = require('mysql2');

const myschema = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'NAveen@9393',
    port: 3306,
    database: 'compussync'
});

myschema.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database:', err);
    } else {
        console.log('Connected to MySQL database');
    }
});

module.exports = myschema;