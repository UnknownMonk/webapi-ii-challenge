const express = require('express');

const server = express();

const posts = require('./posts/postsRoutes');

server.use(express.json());

server.use('/api/posts', posts);
server.use('/', (req, res) => {
  res.status(200).json('Express home route');
});

module.exports = server;
