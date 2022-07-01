//express.js require
const express = require('express');
//will later chain methods to the Express.js server
const {animals} = require('./data/animals');

const PORT = process.env.PORT || 3001;
const app = express();


app.listen(3001, () => {
  console.log(`API server now on port 3001!`);
});