import Tour from './tours.model.js';

export const getAllTours = async (req, res) => {
  try {
    const tours = await Tour.find();
    res.status(200).json({
      status: 'success',
      data: {
        tours,
      },
    });
  } catch (err) {
    console.log(`Error: ${err.message}`);
    return res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

export const createTour = async (req, res) => {
  const tour = new Tour(req.body);
  try {
    const newTour = await tour.save();
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    console.log(`Error: ${err.message}`);
    return res.status(400).json({
      status: 'Bad request',
      message: err.message,
    });
  }
};

export const getTour = (req, res) => {
  res.status(200).json({ data: `Tour with id ${req.params.id}` });
};

export const updateTour = (req, res) => {
  res.status(200).json({ data: `Tour with id ${req.params.id} updated` });
};

export const deleteTour = (req, res) => {
  res.status(200).json({ data: `Tour with id ${req.params.id} deleted` });
};
