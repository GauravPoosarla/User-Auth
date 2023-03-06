const bcrypt = require('bcrypt');
const db = require('../database/models/index');
const jwt = require('jsonwebtoken');

exports.createUser = async (email, password) => {
  const hash = await bcrypt.hash(password, 10);
  const user = {
    email,
    password: hash,
  };
  const result = await db.User.create(user);
  if(!result) {
    throw new Error('User not created');
  }
  return result;
}

exports.loginUser = async (email, password) => {
  const user = await db.User.findOne({ where: { email } });
  if (!user) {
    throw new Error('User not found');
  }
  
  const payload = {
    email: user.email,
  };
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw new Error('Password is incorrect');
  }
  
  const jwtToken = jwt.sign(payload, 'secret', { expiresIn: '1h' });
  await redisClient.set(email, jwtToken);
  return jwtToken;
};

exports.validateToken = async (token) => {
  const decoded = jwt.verify(token, 'secret');
  const user = await db.User.findOne({ where: { email: decoded.email } });
  if(!user) {
    throw new Error('User not found');
  }
  const savedToken = await redisClient.get(user.email);
  if (savedToken !== token) {
    throw new Error('Invalid token');
  }
  
  return user;
}