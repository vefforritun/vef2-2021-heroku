import express from 'express';
import dotenv from 'dotenv';
import xss from 'xss';
dotenv.config();

import { query } from './db.js';

const {
  PORT: port = 3000
} = process.env;

const app = express();

app.get('/', async (req, res) => {
  const result = await query('SELECT * FROM people;');

  const rows = result.rows;
  console.log('result :>> ', result);

  const names = rows.map(r => xss(r.name)).join(', ');
  res.send(`
Nafnalisti: ${names}
<form method="post" action="/post" enctype="application/x-www-form-urlencoded">
  <input type="text" name="name">
  <button>Senda</button>
</form>
  `);
});

app.use(express.urlencoded({ extended: true }));

app.post('/post', async (req, res) => {
  const name = req.body.name;
  console.log('name :>> ', name);
  
  const result = await query('INSERT INTO people (name) VALUES ($1)', [name]);

  res.redirect('/');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
