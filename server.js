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

// Route to add a new person
app.post('/add-person', async (req, res) => {
  const { name, email, phone, picture } = req.body;

  try {
    const result = await pool.query('INSERT INTO people (name, email, phone, picture) VALUES ($1, $2, $3, $4)', [name, email, phone, picture]);
    res.send('Person added successfully');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error adding person');
  }
});

// Route to get all people
app.get('/get-people', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM people');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching people');
  }
});

// Route to update a person's data
app.post('/update-person/:id', async (req, res) => {
  const { id } = req.params;
  const { field, newValue } = req.body;

  try {
    const result = await pool.query(`UPDATE people SET ${field} = $1 WHERE id = $2`, [newValue, id]);
    res.send('Person updated successfully');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error updating person');
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
