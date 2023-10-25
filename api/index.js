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

app.post('POST/item', (req, res) => {
    const mysqlRequest = 'INSERT INTO Items (name, description, id_category) VALUES ("${req.body.name}", "${req.body.description}, ${req.body.price}", "${req.body.category}");';
    connection.query(mysqlRequest, (err, rows, fields) => {
        if (err) throw err;
        res.send("Item added!");
    })
})

app.get('/items/get-items', async (req, res) => {
    const mysqlRequest = "SELECT * FROM Items";
    connection.query(mysqlRequest, (err, rows, fields) => {
        if (err) throw err;
        console.log(rows);
        res.send(rows);
    })
})

app.delete('/items/delete-item', (req, res) => {
    const mysqlRequest = `DELETE "${req.body.name}" FROM ITEMS;`;
    connection.query(mysqlRequest, (err, rows, fields) => {
        if (err) throw err;
        res.send("Element deleted")
    })
})

app.delete('/items/delete-items', (req, res) => {
    const mysqlRequest = 'DELETE  FROM "Items";';
    connection.query(mysqlRequest, (err, rows, fields) => {
        if (err) throw err;
        res.send("All items deleted");
    })
})

app.post('/categorries/post-categorie', (req, res) => {
    const mysqlRequest = 'INSERT INTO Categories ("name", "description") VALUES("${req.body.name}", "${req.body.description}");';
    connection.query(mysqlRequest, (err, rows, fields) => {
        if (err) throw err;
        res.send("Category added");
    })
})

const port = 3000;
app.listen(port, () => console.log(`Server is running on localhost:${port}`));