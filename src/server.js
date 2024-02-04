import app from './app.js';

const port = 3000;
const host = 'http://localhost';
app.listen(port, () => {
  console.log(`App running on ${host}:${port} ...`);
});
