

 // complete the exercise 3.15: Phonebook database, step 3

   app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
   })

app.use(errorHandler)

module.exports = { errorHandler }