//express.js require
const express = require('express');
//will later chain methods to the Express.js server
const { animals } = require('./data/animals');

const PORT = process.env.PORT || 3001;
const app = express();

//app.use method executed by Express.js server that mounts a function to the server that requests pass through before going to intended endpoint.
//parse incoming string or array data
/*express.urlencoded({extended: true}) method built into Express.js
& takes incoming POST data & converts it to key/value pairings to be accessed in req.body object*/
app.use(express.urlencoded({ extended: true }));
//parse incoming JSON data
app.use(express.json());

function filterByQuery(query, animalsArray) {
  let personalityTraitsArray = [];
  // Note that we save the animalsArray as filteredResults here:
  let filteredResults = animalsArray;
  if (query.personalityTraits) {
    // Save personalityTraits as a dedicated array.
    // If personalityTraits is a string, place it into a new array and save.
    if (typeof query.personalityTraits === 'string') {
      personalityTraitsArray = [query.personalityTraits];
    } else {
      personalityTraitsArray = query.personalityTraits;
    }
    // Loop through each trait in the personalityTraits array:
    personalityTraitsArray.forEach(trait => {
      // Check the trait against each animal in the filteredResults array.
      // Remember, it is initially a copy of the animalsArray,
      // but here we're updating it for each trait in the .forEach() loop.
      // For each trait being targeted by the filter, the filteredResults
      // array will then contain only the entries that contain the trait,
      // so at the end we'll have an array of animals that have every one 
      // of the traits when the .forEach() loop is finished.
      filteredResults = filteredResults.filter(
        animal => animal.personalityTraits.indexOf(trait) !== -1
      );
    });
  }
  if (query.diet) {
    filteredResults = filteredResults.filter(animal => animal.diet === query.diet);
  }
  if (query.species) {
    filteredResults = filteredResults.filter(animal => animal.species === query.species);
  }
  if (query.name) {
    filteredResults = filteredResults.filter(animal => animal.name === query.name);
  }
  // return the filtered results:
  return filteredResults;
}

function findById(id, animalsArray) {
  const result = animalsArray.filter(animal => animal.id === id)[0];
  return result;
}

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
  //req.body is where incoming content will be
  console.log(req.body);
  res.json(req.body);
});

/*req.query is multifaceted & combines multiple parameters, but 
req.param is specific to a single property, intended to retrieve a single record*/
app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});