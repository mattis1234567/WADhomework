const express = require('express');
const pool = require('./database');
const cors = require('cors')
const {isEmptyArray} = require('./util');
const port = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(express.json());

app.listen(port, () => {
    console.log("Server is listening on port " + port);
});

app.post('/api/posts', async(req, res) => {
    const post = req.body;
    const result = await pool.query("INSERT INTO posts (body, creation_time) values ($1, $2) RETURNING *", 
        [post.body, post.creation_time]);
    res.status(201).json(result.rows[0]);
})

app.get('/api/posts', async(req, res) => {
    const result = await pool.query("SELECT * FROM posts");
    res.json(result.rows);
});

app.get('/api/posts/:id', async(req, res) => {
    const result = await pool.query("SELECT * FROM posts WHERE id = $1", [req.params.id]);
    if (isEmptyArray(result.rows)) {
        res.status(404).send();
    } else {
        res.status(200).json(result.rows[0]);
    }
});

app.put('/api/posts/:id', async(req, res) => {
    const {id} = req.params;
    const post = req.body;
    const result = await pool.query("UPDATE posts SET (title, body, creation_time) = ($2, $3, $4) WHERE id = $1 RETURNING *;", 
        [id, post.title, post.body, post.creation_time]);

    if (isEmptyArray(result.rows)) {
        res.status(404).send();
    } else {
        res.status(200).json(result.rows[0]);
    }
});

app.delete('/api/posts/', async(req, res) => {
    await pool.query("TRUNCATE TABLE posts");
    res.status(204).send();
});

app.delete('/api/posts/:id', async(req, res) => {
    const { id } = req.params;
    const result = await pool.query("DELETE FROM posts WHERE id = $1 RETURNING *;", [id]);

    if (isEmptyArray(result.rows)) {
        res.status(404).send();
    } else {
        res.status(200).json(result.rows[0]);
    }
});

// Accessing any other path is 404
app.use((req, res) => {
    res.status(404).send("Nothing");
});

// When there was an error handling above requests.
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({error: "Database error"});
});