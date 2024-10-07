const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 3000;

// Replace with your actual database credentials
const pool = new Pool({
  user: 'your_user',
  host: 'your_host',
  database: 'your_database',
  password: 'your_password',
  port: 5432,
});

app.use(express.json());

app.post('/add-person', async (req, res) => {
  const { name, email } = req.body;

  try {
    const result = await pool.query('INSERT INTO people (name, email) VALUES ($1, $2)', [name, email]);
    res.send('Person added successfully');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error adding person');
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
