//express.js require
const express = require('express');
//will later chain methods to the Express.js server
const { animals } = require('./data/animals');

const PORT = process.env.PORT || 3001;
const app = express();
const fs = require('fs');
const path = require('path');

//app.use method executed by Express.js server that mounts a function to the server that requests pass through before going to intended endpoint.
//parse incoming string or array data
/*express.urlencoded({extended: true}) method built into Express.js
& takes incoming POST data & converts it to key/value pairings to be accessed in req.body object*/
app.use(express.urlencoded({ extended: true }));
//parse incoming JSON data
app.use(express.json());
app.use(express.static('public'));









//GETS

app.get('/api/animals', (req, res) => {
  let results = animals;
  if (req.query) {
    results = filterByQuery(req.query, results);
  }
  res.json(results);
})

//defines the param object in the route path with <route>/;<parameterName>
app.get('/api/animals/:id', (req, res) => {
  const result = findById(req.params.id, animals);
  if (result) {
    res.json(result);
  } else {
    res.send(404);
    //if no record of the animal being searched exists user gets a 404 error.
  }
});

//listens for POST requests
//POST requests used by the user to request that a server accepts data.
app.post('/api/animals', (req, res) => {
  // set id based on what the next index of the array will be
  req.body.id = animals.length.toString();

  if (!validateAnimal(req.body)) {
    res.status(400).send('The animal is not properly formatted.');
  } else {
    const animal = createNewAnimal(req.body, animals);
    res.json(animal);
  }
});
/*req.query is multifaceted & combines multiple parameters, but 
req.param is specific to a single property, intended to retrieve a single record*/

//route to ./public/index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/animals', (req, res) => {
  res.sendFile(path.join(__dirname, './public/animals.html'));
});

app.get('/zookeepers', (req, res) => {
  res.sendFile(path.join(__dirname, './public/zookeepers.html'));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});