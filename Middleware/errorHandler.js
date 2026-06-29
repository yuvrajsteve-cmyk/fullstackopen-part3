

 // complete the exercise 3.15: Phonebook database, step 3

// Middleware/errorHandler.js
const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  }
  next(error);
};

module.exports = errorHandler; // ਇਹ ਲਾਈਨ ਸਭ ਤੋਂ ਜ਼ਰੂਰੀ ਹੈ