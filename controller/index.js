const service = require('../service');

exports.createUser = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const user = await service.createUser(email, password);
  res.status(201).json(user);
}

exports.loginUser = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const user = await service.loginUser(email, password);
  res.status(200).json(user);
}

exports.validateToken = async (req, res) => {
  const token = req.body.token;
  try {
    const user = await service.validateToken(token);
    res.status(200).json(user);
  }
  catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
}
