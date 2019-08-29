import axios from 'axios';
const express = require('express');
const pool = require('../modules/pool');

const router = express.Router();
require('dotenv').config();
process.env.API_KEY

router.get('/', (req, res) => {
    // GET REQUEST TO GIPHY SEARCH
    axios.get(`http://api.giphy.com/v1/gifs/search?API_KEY=${process.env.API_KEY}&q=bananas`)
        .then((response) => {
            console.log('in GET:', response.data);
            res.send(response.data);
        }).catch((error) => {
            console.log('in GET error:', error);
        });//END AXIOS.GET
        
    // return all categories
    const queryText = `SELECT * FROM category ORDER BY name ASC`;
    pool.query(queryText)
        .then( (result) => {
            res.send(result.rows);
        })
        .catch( (error) => {
            console.log(`Error on query ${error}`);
            res.sendStatus(500);
        });
});

module.exports = router;
