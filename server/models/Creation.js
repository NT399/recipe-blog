const { Schema, model } = require('mongoose');

const creationSchema = new Schema({
  creationText: {
    type: String,
    required: true,
    trim: true,
  },
  creationURL: {
    type: String,
    trim: true,
  },
  creationAuthor: {
    type: String,
    required: true,
    trim: true,
  }
});

const Creation = model('Creation', creationSchema);

module.exports = Creation;
