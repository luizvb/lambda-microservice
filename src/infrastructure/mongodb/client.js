const mongoose = require('mongoose')
const {
  MONGODB_URL = ''
} = process.env

mongoose.connect(
  MONGODB_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  }
)

module.exports = mongoose
