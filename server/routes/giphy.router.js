const express = require('express');
const router = express.Router();
const axios = require('axios');
require('dotenv').config();
process.env.API_KEY

router.get('/', (req, res) => {
    axios.get(`http://api.giphy.com/v1/gifs/search?api_key=${process.env.API_KEY}&q=bananas`)
        .then((response) => {
            console.log('in GET:', response.data);
            res.send(response.data);
        }).catch((error) => {
            console.log('in GET error:', error);
        })
})
module.exports = router;