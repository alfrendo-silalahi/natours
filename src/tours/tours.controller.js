export const getAllTours = (req, res) => {
  res.status(200).json({ data: 'Get all tours' });
};

export const createTour = (req, res) => {
  res.status(201).json({ requestBody: req.body });
};

export const getTour = (req, res) => {
  console.log(req.params);
  res.status(200).json({ data: `Tour with id ${req.params.id}` });
};

export const updateTour = (req, res) => {
  console.log(req.params);
  res.status(200).json({ data: `Tour with id ${req.params.id} updated` });
};

export const deleteTour = (req, res) => {
  res.status(200).json({ data: `Tour with id ${req.params.id} deleted` });
};
