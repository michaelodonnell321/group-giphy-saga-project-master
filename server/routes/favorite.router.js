const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// return all favorite images
router.get('/', (req, res) => {
  //SELECTING FROM OUR DATABASE
  let queryText = 'SELECT * FROM "favorites";';
  pool.query(queryText)
  .then(result => {
    //WANT THE FULL ROWS TO RETURN TO US
    res.send(result.rows);
    res.sendStatus(200);
  })
  .catch(error => {
    console.log('error in SERVER GET', error)
    res.sendStatus(500);
  })
});

// add a new favorite 
router.post('/', (req, res) => {
  console.log('in post', req.body);
  //ADDING TO OUR FAVORITES TABLE BY URL
  const queryText = `INSERT INTO favorites ("url") VALUES ($1)`
  //ADDRESS IS A KEY NAME FOR URL IN AN OBJECT
  pool.query(queryText, [req.body.address])
  .then((result) => {
    res.sendStatus(201);
  }).catch((error) => {
    res.sendStatus(500);
  })
});

// update given favorite with a category id
// req.body should contain a category_id to add to this favorite image
router.put('/:favId', (req, res) => {
  let favId = req.params.favId;
  //UPDATING FAV TABLE WITH CATEGORY ID
  let queryText = `UPDATE "favorites"
                    SET "category_id" = $1
                    WHERE "id" = $2;`;
  //REQ.BODY = CATEGORY_ID($1); FAVID = $2
  pool.query(queryText, [req.body, favId])
  .then(results => {
    res.sendStatus(200);
    console.log(results);
  })
  .catch(error => {
    console.log(error);
    res.sendStatus(500);
  })
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
router.delete('/:id', (req, res) => {
  //DELETING ON FAV TABLE WHERE ID = $1
  const queryText = `DELETE FROM "favorites" WHERE "id" = $1`;
  pool.query(queryText, [req.params.id])
  .then((result) => {
    res.sendStatus(204)
  })
});

module.exports = router;
