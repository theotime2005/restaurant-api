import express from 'express';
import mysql from 'mysql2';

const app = express();

app.use(express.json());

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    port: '3306',
    password: 'root',
    database: 'restaurant',
});

connection.connect()

app.post('/api/post-item', (req, res) => {
    const mysqlRequest = `INSERT INTO Article VALUES (${req.body.name}, ${req.body.price}, ${req.body.categorie});`;
    console.log(mysqlRequest);
    connection.query(mysqlRequest, (err, rows, fields) => {
        if (err) throw err;
        res.send(rows);
    })
})

app.get('/api/get-items', async (req, res) => {
    const mysqlRequest = "SELECT * FROM Article";
    connection.query(mysqlRequest, (err, rows, fields) => {
        if (err) throw err;
        console.log(rows);
        res.send(rows);
    })
})

const port = 3000;
app.listen(port, () => console.log(`Server is running on localhost:${port}`));