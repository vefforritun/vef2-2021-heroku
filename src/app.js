import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send(`
<form method="post" action="/post" enctype="application/x-www-form-urlencoded">
  <input type="text" name="data">
  <input type="file" name="file">
  <button>Senda</button>
</form>
  `);
});

app.use(express.urlencoded({ extended: true }));

app.post('/post', (req, res) => {
  console.log('req.body :>> ', req.body);
  res.send(`POST gögn: ${JSON.stringify(req.body)}`);
});

const hostname = '127.0.0.1';
const port = 3000;

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
