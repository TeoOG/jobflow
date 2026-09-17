const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();

app.use(cors());
app.use(express.json());

// get is the browser address bar's default HTTP method
app.get('/api/jobs', async (req, res) => {
  
  const result = await pool.query('SELECT * FROM jobs');
  res.json(result.rows);


});

// Create a new job
app.post('/api/jobs', async (req, res) => {


  // console.log('NEW POST ROUTE');

  const { company, title, status } = req.body;

  // console.log(company, title, status);
  // res.json({
  //   company: company,
  //   title: title,
  //   status: status
  // });

  // $ is parameterized query, prevents user input from simply becoming executable SQL, protecting against SQL injection 
  // PostgreSQL, after inserting the row, return the newly created row to me. That's useful because PostgreSQL generates the id automatically:
  const result = await pool.query(
    'INSERT INTO jobs (company, title, status) VALUES ($1, $2, $3) RETURNING *',
    [company, title, status]
  );

  res.json(result.rows[0]);
});

app.patch('/api/jobs/:id', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const result = await pool.query(
    'UPDATE jobs SET status = $1 WHERE id = $2 RETURNING *',
    [status, id]
  );

  res.json(result.rows[0]);
});

app.delete('/api/jobs/:id', async (req, res) => {
  const { id } = req.params;

  const result = await pool.query(
    'DELETE FROM jobs WHERE id = $1 RETURNING *',
    [id]
  );

  res.json(result.rows[0]);
});

app.listen(3000, () => {
  console.log('API running on http://localhost:3000');
});