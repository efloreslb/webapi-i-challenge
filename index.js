// implement your API here

const express = require('express');
const db = require('./data/db');
const port = 7000;
const server = express();
server.use(express.json());

server.post('/api/users', (req, res) => {
   const newUser = req.body;

   db.insert(newUser)
   .then(addedUser => {
      res.status(201).json(addedUser);
   })
   .catch(({ code, message }) => {
      res.status(code).json({ err: message })
   })
})

server.listen(port, () => {
   console.log(`Listening on port ${port}`)
})