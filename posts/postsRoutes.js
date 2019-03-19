const express = require('express');
const router = express.Router();
const db = require('../data/db');

router.use(express.json());

router.post('/', (req, res) => {
  const { title, contents } = req.body;
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

router.get('/', (req, res) => {
  db.find()
    .then(posts => {
      res.status(200).json({ 'Here are your posts': posts });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: 'The posts information could not be retrieved.' });
    });
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  db.findById(id)

    .then(posts => {
      if (id) {
        res.status(200).json({ Posts: posts });
      } else {
        res
          .status(404)
          .json({ message: 'The post with the specified ID does not exist.' });
      }
    })
    .catch(err => {
      res
        .status()
        .json({ message: 'The post with the specified ID does not exist.' });
    });
});

router.delete('/:id', (req, res) => {
  const id = req.params.id;
  db.remove(id)
    .then(removePost => {
      if (removePost) {
        res.status(200).json(removePost);
      } else {
        res
          .status(404)
          .json({ message: 'The post with the specified ID does not exist.' });
      }
    })
    .catch(err => {
      res.status(500).json({ error: 'The post could not be removed' });
    });
});

module.exports = router;
