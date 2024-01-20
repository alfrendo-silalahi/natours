import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello from the server side!' });
});

app.post('/', (req, res) => {
  res.status(201).json({ message: 'POST to this endpoint!' });
});

const port = 3000;
const host = 'http://localhost';
app.listen(port, () => {
  console.log(`App running on ${host}:${port} ...`);
});
