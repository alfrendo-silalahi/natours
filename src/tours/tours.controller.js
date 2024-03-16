import Tour from './tours.model.js';

export const getAllTours = async (req, res) => {
  try {
    // const tours = await Tour.find({
    //   duration: req.query.duration,
    //   difficulty: req.query.difficulty,
    // });

    // const tours = await Tour.find()
    //   .where('duration')
    //   .equals(req.query.duration)
    //   .where('difficulty')
    //   .equals(req.query.difficulty);

    // Build query
    // 1) Filtering
    const queryObj = { ...req.query };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => delete queryObj[el]);

    // Execute query
    // 2) Advanced filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    const query = Tour.find(JSON.parse(queryStr));
    const tours = await query;

    // Send response
    res.status(200).json({
      status: 'success',
      result: tours.length,
      data: {
        tours,
      },
    });
  } catch (err) {
    res.status(400).json({
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
    res.status(400).json({
      status: 'Bad request',
      message: err.message,
    });
  }
};

export const getTour = async (req, res) => {
  try {
    const { id } = req.params;
    const tour = await Tour.findById(id);
    if (!tour) {
      throw new Error(`No tour found with id ${id}`);
    }
    res.status(200).json({ status: 'success', data: tour });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

export const updateTour = async (req, res) => {
  try {
    const { id } = req.params;
    const tour = await Tour.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({ status: 'success', data: tour });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

export const deleteTour = async (req, res) => {
  try {
    const { id } = req.params;
    await Tour.findOneAndDelete({ _id: id });
    res.status(200).json({
      status: 'success',
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};
