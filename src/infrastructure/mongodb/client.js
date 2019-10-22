const mongoose = require("mongoose");
const {
    MONGODB_URL = "mongodb+srv://cmv_notei:udRJri581azybkgt@prod-0zesc.mongodb.net/cmv_notei?retryWrites=true&w=majority",
  } = process.env;

  mongoose.connect(
    MONGODB_URL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    }
);

module.exports = mongoose;