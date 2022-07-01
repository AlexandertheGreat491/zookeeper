//express.js require
const express = require('express');
//will later chain methods to the Express.js server

const { animals } = require('./data/animals');

app.listen();
app.get('/api/animals', (req, res) => {
  res.send('Hello!');
});

app.listen(3001, () => {
  console.log(`API server now on port 3001!`);
});