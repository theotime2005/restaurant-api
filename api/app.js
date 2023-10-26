function insert_into(tableName, relations, values) {
    let text = "INSERT INTO " + tableName + "(" + relations + ") VALUES (";
    for (let i = 0; i < values.length; i++) {
        text += "'" + values[i] + "'";
        if (i + 1 < values.length) {
            text += ",";
        }
    }
    text += ");";
    return text;
}


const express = require('express');
const app = express();
app.use(express.json());

const sql = require('mysql');

const restaurant = sql.createConnection({
    host: "localhost",
    user: "root",
    port: "3306",
    password: "root",
    database: "restaurant"
})
restaurant.connect();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// Items
app.get('/items', (req, res) => {
    const mysqlRequest = "SELECT i.*\n" +
        "FROM Items i\n" +
        "JOIN Categories c ON i.category_id = c.id\n" +
        `WHERE c.name = '${req.query.category}';`;
    restaurant.query(mysqlRequest, (err, rows, fields) => {
        if (err) throw err;
        res.status(200).json({ items: rows});
    })
})

app.post('/items', (req, res) => {
    const mysqlRequest = insert_into("Items", "name, description, price, category_id", [
        req.body.name,
        req.body.description,
        req.body.price,
        req.body.category_id
    ]);
    restaurant.query(mysqlRequest, (err, rows, fields) => {
        if (err) throw err;
        res.send("item added");
    });
});

app.get('/items/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const mysqlRequest = `SELECT * FROM Items WHERE id = ${id};`;
    restaurant.query(mysqlRequest, (err, rows, fields) => {
        if (err) throw err;
        res.send(rows[0]);
    })
})

app.put('/items/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const mysqlRequest = `UPDATE Items SET name = \'${req.body.name}\', description = \'${req.body.description}\', price = \'${req.body.price}\', category_id = ${req.body.category_id}`;
    restaurant.query(mysqlRequest, (err, rows, fields) => {
        if (err) throw err;
        res.send(req.body);
    })
})

app.delete('/items/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const mysqlRequest = `DELETE FROM Items WHERE id = ${id};`;
    restaurant.query(mysqlRequest, (err, rows, fields) => {
        if (err) throw err;
        res.send("Item deleted");
    })
})

// Categories
app.get('/categories', (req, res) => {
    const mysqlRequest = "SELECT * FROM Categories;";
    restaurant.query(mysqlRequest, (err, rows, fields) => {
        if (err) throw err;
        res.send(rows);
    })
})

app.post('/categories', (req, res, next) => {
    if (typeof req.body==="undefined") {
        res.send("You must take name for your Category");
    }
    const mysqlRequest = insert_into("Categories", "name", [req.body.name]);
    restaurant.query(mysqlRequest, (err, rows, fields) => {
        if (err) throw err;
        res.send("Category added");
    })
})

module.exports = app;