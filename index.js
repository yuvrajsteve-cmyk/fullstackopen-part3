require('dotenv').config()
const express = require('express')
const app = express()
const Person = require(`./models/Persons`)


app.use(express.static('build'))
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
   




  const PORT = process.env.PORT || 3001
  app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
  })