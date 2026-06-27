require('dotenv').config()
const express = require('express')
const app = express()
const Person = require(`./models/Persons`)


app.use(express.static('dist'))
app.use(express.json())




const mongoose =  require('mongoose')
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

  app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name || !body.number) {
      return response.status(400).json({error: 'name or number is missing'})
    }

    const person = new Person ({
      name: body.name,
      number: body.number,
    })

    person.save().then(savedPerson => {
      response.json(savedPerson)
    })
  })




  const PORT = process.env.PORT || 3001
  app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
  })