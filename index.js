require('dotenv').config(); //look for .env file and looks for key/value pairs
// console.log('process env', process.env);

const express = require('express');
const db = require('./data/db');

const PORT = process.env.PORT || 4001;

const server = express();
server.use(express.json());

server.post('/api/users', (req, res) => {
   const newUser = req.body;
   const {name, bio} = req.body;

   if (!name || !bio) {
      res.status(400).json({error: "Please provide name and bio for the user."})
   }
   else {
      db.insert(newUser)
      .then(addedUser => {
         res.status(201).json(addedUser);
      })
      .catch(({ code, message }) => {
         res.status(500).json({ error: "There was an error while saving the user to the database"})
      })
   }
})

server.get('/api/users', (req, res) => {
   db.find()
   .then(allUsers => {
      res.json(allUsers);
   })
   .catch(({ code, message }) => {
      res.status(500).json({ error: "The users information could not be retrieved." });
   })
})

server.get('/api/users/:id', (req, res) => {
   const { id } = req.params;

   db.findById(id)
   .then(userById => {
      if(userById) {
         res.json(userById)
      }
      else {
         res.status(404).json({ error: "The user with the specified ID does not exist."})
      }
      
   })
   .catch(({ code, message }) => {
      res.status(500).json({ error: "The user information could not be retrieved." })
   })
})

server.delete('/api/users/:id', (req, res) => {
   const { id } = req.params;

   db.remove(id)
   .then(removedUser => {
      if(removedUser) {
         res.json(removedUser)
      } 
      else {
         res.status(404).json({ message: "The user with specified ID does not exist "})
      }
   })
   .catch(({ code, message }) => {
      res.status(500).json({ err: "The user could not be removed" })
   })
})

server.put('/api/users/:id', (req, res) => {
   const { id } = req.params;
   const newInfo = req.body;
   const {name, bio} = req.body;

   db.update(id, newInfo)
   .then(updatedUser => {
      if(updatedUser) {
         if(!name || !bio) {
            res.status(400).json({ errorMessage: "Please provide name and bio for the user" })
         }
         else { 
            res.json(updatedUser);
         }
      } 
      else {
         res.status(404).json({ message: "The user with the specified does not exist" })
      }
   })
   .catch(({ code, message }) => {
      res.status(500).json({ error: "The user information could not be modified" });
   })
})

server.listen(PORT, () => {
   console.log(`Listening on port ${PORT}`)
})