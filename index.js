const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

// Set view engine to EJS
app.set('view engine', 'ejs');
app.use(express.static('public'));

// Home route to fetch a random cocktail
app.get('/', async (req, res) => {
  try {
    // Make a GET request to the CocktailDB API
    const response = await axios.get('https://www.thecocktaildb.com/api/json/v1/1/random.php');
    const cocktail = response.data.drinks[0]; // Get the first (and only) drink in the response

    // Render the data in the index.ejs file
    res.render('index', { cocktail });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving cocktail data');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
