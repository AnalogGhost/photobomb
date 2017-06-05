const express = require('express');
const router = express.Router();

const queries = require('../queries/photos')

router.get('/', (req,res,next) => {
  queries.list()
  .then(result => {
    res.send(result);
  })
  .catch( err => {
    next(err);
  });
});

module.exports = router;
