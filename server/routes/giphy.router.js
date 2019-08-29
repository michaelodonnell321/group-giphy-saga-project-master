const express = require('express');
const router = express.Router();
const axios = require('axios');
require('dotenv').config();
// process.env.API_KEY

router.get('/:search', (req, res) => {
    console.log('in ROUTERGIHPY:', req.params.search);
    
    axios.get(`http://api.giphy.com/v1/gifs/search?api_key=${process.env.API_KEY}&q=${req.params.search}`)
        .then((response) => {
            // console.log('in GET:', response.data);
            res.send(response.data);
        }).catch((error) => {
            console.log('in GET error:', error);
        })
})
module.exports = router;