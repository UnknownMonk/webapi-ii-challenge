const express = require('express');
const router = express.Router();
const db = require('../data/db');

server.use(express.json());

router.post('/', (req, res) => {
  if (!title || !contents) {
    res.status(400).json({
      errorMessage: 'Please provide title and contents for the post.'
    });
  }

  db.insert(req.body)
    .then(insertedPost => {
      res.status(201).json({ 'Post Created': insertedPost });
    })
    .catch(err => {
      res.status(500).json({
        error: 'There was an error while saving the post to the database'
      });
    });
});

module.exports = router;
