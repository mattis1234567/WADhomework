const express = require('express');
const pool = require('./database');
const cors = require('cors');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

const port = process.env.PORT || 3000;
const secret = "ui13r982hg7839j4kvm3iu02+kol23.2f+03fkm2,o3,3omcu3vrv903"; 

const app = express();

app.use(cors({ origin: 'http://localhost:8080', credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.listen(port, () => {
    console.log("Server is running on port " + port);
});

const authenticateToken = (req, res, next) => {
    const token = req.cookies.jwt;

    if (!token) return res.status(401).json({ error: "Null token" });

    jwt.verify(token, secret, (err, user) => {
        if (err) return res.status(403).json({ error: "Token invalid" });
        req.user = user;
        next();
    });
};

app.post('/auth/signup', async (req, res) => {
    try {
        const { email, password } = req.body;
        const salt = await bcrypt.genSalt();
        const bcryptPassword = await bcrypt.hash(password, salt);

        const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        if (user.rows.length !== 0) {
            res.status(409).json({error: "User already exists"});
            return;
        }

        const newUser = await pool.query(
            "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *", 
            [email, bcryptPassword]
        );
        
        const token = jwt.sign({ id: newUser.rows[0].id }, secret, { expiresIn: '1h' });
        
        res.cookie('jwt', token, { httpOnly: true, maxAge: 3600000 });
        res.status(201).json({ user_id: newUser.rows[0].id });
        
    } catch (err) {
        console.error(err.message);
        res.status(400).json({ error: err.message });
    }
});

app.post('/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        
        if (user.rows.length === 0) return res.status(401).json({ error: "User not registered" });

        const validPassword = await bcrypt.compare(password, user.rows[0].password);
        if (!validPassword) return res.status(401).json({ error: "Incorrect password" });

        const token = jwt.sign({ id: user.rows[0].id }, secret, { expiresIn: '1h' });
        
        res.cookie('jwt', token, { httpOnly: true, maxAge: 3600000 });
        res.status(200).json({ user_id: user.rows[0].id });
        
    } catch (err) {
        res.status(401).json({ error: err.message });
    }
});

app.get('/auth/logout', (req, res) => {
    res.clearCookie('jwt');
    res.status(200).send({ message: "Logged out" });
});

app.get('/auth/authenticate', async (req, res) => {
    const token = req.cookies.jwt;
    if (!token) return res.json({ authenticated: false });

    jwt.verify(token, secret, async(err, decoded) => {
        if (err) return res.json({ authenticated: false });
        const userID = decoded.id;
        const user = await pool.query("SELECT * FROM users WHERE id = $1", [userID]);
        res.json({ authenticated: true, email: user.rows[0].email });
    });
});

app.post('/api/posts', authenticateToken, async (req, res) => {
    try {
        const { body } = req.body;
        const result = await pool.query(
            "INSERT INTO posts (body) VALUES ($1) RETURNING *", 
            [body]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

app.get('/api/posts', authenticateToken, async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM posts");
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

app.get('/api/posts/:id', authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query("SELECT * FROM posts WHERE id = $1", [id]);
        if (result.rows.length === 0) {
            return res.status(404).send();
        } else {
            res.status(200).json(result.rows[0]);
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

app.put('/api/posts/:id', authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const { body } = req.body;
        const result = await pool.query(
            "UPDATE posts SET body = $1 WHERE id = $2 RETURNING *", 
            [body, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).send();
        } else {
            res.json(result.rows[0]);
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

app.delete('/api/posts', authenticateToken, async (req, res) => {
    try {
        await pool.query("TRUNCATE TABLE posts");
        res.sendStatus(200);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

app.delete('/api/posts/:id', authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query("DELETE FROM posts WHERE id = $1 RETURNING *", [id]);
        if (result.rows.length === 0) {
            return res.status(404).send("Post not found");
        } else {
            res.status(200).json(result.rows[0]);
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
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