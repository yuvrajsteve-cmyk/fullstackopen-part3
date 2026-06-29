require('dotenv').config()
const express = require('express')
const app = express()
const Person = require(`./models/Persons`)
const Notes = require('./models/Notes')
const errorHandler = require('./Middleware/errorHandler')


app.use(express.static('dist'))
app.use(express.json())




const mongoose =  require('mongoose')
const Persons = require('./models/Persons')
const url = process.env.MONGO_URI

console.log(`connecting to the ${url}`)



mongoose.connect(url)
  .then(result => {
    console.log(`connected to mongoDB`)
  })
  .catch((error) => {
    console.log(`error to connecting to mongoDB`, error.message)
  })




  app.get('/api/persons', (request, response) => {
    Person.find({}).then(people => {
        response.json(people)
    })
  })
    
  // use the post method to add the data 

  app.post('/api/persons', (request, response, next) => {
  const body = request.body

  const person = new Person ({
    name: body.name,
    number: body.number,
  })

  person.save()
    .then(savedPerson => {
      response.json(savedPerson)
    })
    .catch(error => next(error)) 
})

  // send the get  rquest with notes
  app.get('/api/notes', (request,  response) => {
    Notes.find({}).then(note => {
      response.json(note)
    })
})
   
  // use the post method in the notes 
  app.post('/api/notes', (request, response) => {
    const body = request.body

    if (!body.content || !body.important) {
      return response.status(400).json({error: 'content is missing'})
    }
    const note = new Notes ({
      content : body.content,
      important : body.important,
    })

    note.save().then(savedNote => {
      response.json(savedNote)
    })
    .catch(error => next(error))
  })

 // use the id method for the notes
  app.get('/api/notes/:id', (request, response, next) => {
  Notes.findById(request.params.id)
    .then(note => {
      if (note) {
        response.json(note) 
      } else {
        response.status(404).end() 
      }
    })
    .catch(error => next(error)) 
})

  // use the id method for the persons
app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})
 

//   const errorHandler = (error, request, response, next) => {
//   console.error(error.message)

//   if (error.name === 'CastError') {
//     return response.status(400).send({ error: 'malformatted id' })
//   }

//   next(error)
// }

  

  // use the delete route for the persons.js
  // DELETE route for persons
app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

  // use the update route for persons.js
  app.put('/api/persons/:id', (request, response, next) => {
    const { name, number} = request.body
    Person.findByIdAndUpdate(request.params.id,
      { name, number },
      { new: true, runValidators: true, context: 'query'}
    )
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
  })

  // exercise 3.18 with info
  app.get('/info', (request, response, next) => {
    Person.countDocuments({}).then(count => {
      const date = new Date()
      response.send(`<p>Phonebook has info for ${count} people</p>
        <p>${date}</p>
        `)
    })
    .catch(error => next(error))
  })

  // app use handler ithe use kita hoya aa
  app.use(errorHandler)

  const PORT = process.env.PORT || 3001
  app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
  })