const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const creatorAccounts = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  creations: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Creation',
    },
  ],
});

creatorAccounts.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

creatorAccounts.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = model('User', creatorAccounts);

module.exports = User;
