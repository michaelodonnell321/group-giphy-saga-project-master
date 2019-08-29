const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config();
process.env.API_KEY

// Route includes
const favoriteRouter = require('./routes/favorite.router');
const categoryRouter = require('./routes/category.router');
const giphyRouter = require('./routes/giphy.router')

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files
app.use(express.static('build'));

/* Routes */
app.use('/api/favorite', favoriteRouter);
app.use('/api/category', categoryRouter);
app.use('/api/giphy', giphyRouter);

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
