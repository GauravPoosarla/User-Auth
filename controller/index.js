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
  const token = await service.loginUser(email, password);
  res.status(200).json(token);
}

exports.validateToken = async (req, res) => {
  const token = req.header('token');
  if(!token) {
    res.status(401).json({ message: 'Invalid token' });
  }

  try {
    const user = await service.validateToken(token);
    const savedToken = await redisClient.get(user.email);
    if (savedToken !== token) {
      res.status(401).json({ message: 'Invalid token' });
    }
    res.status(200).json(user);
  }
  catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
}
