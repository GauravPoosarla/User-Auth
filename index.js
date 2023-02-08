const express = require('express');
const controller = require('./controller');

const app = express();
app.use(express.json());

app.post('/user', controller.createUser);
app.post('/login', controller.loginUser);
app.post('/validate', controller.validateToken);

app.listen(8000, () => {
  console.log('Server is running on port 8000');
});