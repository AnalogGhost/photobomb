const express = require('express');
const router = express.Router();

const queries = require('../queries/photos');

router.get('/', (req,res,next) => {
  queries.get()
  .then(result => {
    res.send(result);
  });
});

router.get('/:id', (req,res,next) => {
  queries.get(req.params.id)
  .then(result => {
    res.send(result);
  });
});

module.exports = router;
