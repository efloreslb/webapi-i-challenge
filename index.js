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

server.get('/api/users', (req, res) => {
   db.find()
   .then(allUsers => {
      res.json(allUsers);
   })
   .catch(({ code, message }) => {
      res.status(code).json({ err: message });
   })
})

server.get('/api/users/:id', (req, res) => {
   const { id } = req.params;

   db.findById(id)
   .then(userById => {
      res.json(userById)
   })
   .catch(({ code, message }) => {
      res.status(code).json({ err: message })
   })
})

server.delete('/api/users/:id', (req, res) => {
   const { id } = req.params;

   db.remove(id)
   .then(removedUser => {
      res.json(removedUser)
   })
   .catch(({ code, message }) => {
      res.status(code).json({ err: message })
   })
})

server.put('/api/users/:id', (req, res) => {
   const { id } = req.params;
   const newInfo = req.body;

   db.update(id, newInfo)
   .then(updatedUser => {
      res.json(updatedUser);
   })
   .catch(({ code, message }) => {
      res.status(code).json({ err: message });
   })
})

server.listen(port, () => {
   console.log(`Listening on port ${port}`)
})