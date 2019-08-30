const express = require('express');
const pool = require('../modules/pool');

const router = express.Router();

// return all favorite images
router.get('/', (req, res) => {
  res.sendStatus(200);
});

// add a new favorite 
router.post('/', (req, res) => {
  console.log('in post', req.body);
  
  const queryText = `INSERT INTO favorites ("url") VALUES ($1)`
  pool.query(queryText, [req.body.address])
  .then((result) => {
    res.sendStatus(201);
  }).catch((error) => {
    res.sendStatus(500);
  })
});

// update given favorite with a category id
router.put('/:favId', (req, res) => {
  // req.body should contain a category_id to add to this favorite image
  res.sendStatus(200);
});

// const queryText = `SELECT * FROM category ORDER BY name ASC`;
// pool.query(queryText)
//   .then((result) => {
//     res.send(result.rows);
//   })
//   .catch((error) => {
//     console.log(`Error on query ${error}`);
//     res.sendStatus(500);
//   });
// });

// delete a favorite
router.delete('/', (req, res) => {
  res.sendStatus(200);
});

module.exports = router;
