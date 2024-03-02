export const getAllUsers = (req, res) => {
  res.status(200).json({ data: 'Get all users' });
};

export const createUser = (req, res) => {
  res.status(201).json({ requestBody: req.body });
};

export const getUser = (req, res) => {
  res.status(200).json({ data: `User with id ${req.params.id}` });
};

export const updateUser = (req, res) => {
  res.status(200).json({ data: `User with id ${req.params.id} updated` });
};

export const deleteUser = (req, res) => {
  res.status(200).json({ data: `User with id ${req.params.id} deleted` });
};
