import express from 'express';

const app = express();
app.use(express.json());

const getAllTours = (req, res) => {
  res.status(200).json({ data: 'Get all tours' });
};

const createTour = (req, res) => {
  res.status(201).json({ requestBody: req.body });
};

const getTour = (req, res) => {
  console.log(req.params);
  res.status(200).json({ data: `Tour with id ${req.params.id}` });
};

const updateTour = (req, res) => {
  console.log(req.params);
  res.status(200).json({ data: `Tour with id ${req.params.id} updated` });
};

const deleteTour = (req, res) => {
  res.status(200).json({ data: `Tour with id ${req.params.id} deleted` });
};

app.route('/api/v1/tours').get(getAllTours).post(createTour);
app
  .route('/api/v1/tours/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

/*
app.get('/api/v1/tours', getAllTours);
app.post('/api/v1/tours', createTour);
app.get('/api/v1/tours/:id', getTour);
app.patch('/api/v1/tours/:id', updateTour);
app.delete('/api/v1/tours/:id', deleteTour);
*/

const port = 3000;
const host = 'http://localhost';
app.listen(port, () => {
  console.log(`App running on ${host}:${port} ...`);
});
