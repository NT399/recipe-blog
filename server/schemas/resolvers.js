const { AuthenticationError } = require('apollo-server-express');
const { User, Creation } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('creations');
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate('creations');
    },
    creations: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Creation.find(params);
    },
    creation: async (parent, { creationId }) => {
      return Creation.findOne({ _id: creationId });
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('creations');
      }
      throw new AuthenticationError('Please log in');
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email }) => {
      const user = await User.findOne({ email });

      const token = signToken(user);

      return { token, user };
    },
    addCreation: async (parent, { creationText, creationURL }, context) => {
      if (context.user) {
        const creation = await Creation.create({
          creationText, creationURL,
          creationAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { creations: creation._id } }
        );

        return creation;
      }
      throw new AuthenticationError('You are not logged in');
    },
    removeCreation: async (parent, { creationId }, context) => {
      if (context.user) {
        const creation = await Creation.findOneAndDelete({
          _id: creationId,
          creationAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { creations: creation._id } }
        );

        return creation;
      }
      throw new AuthenticationError('Please log in');
    }
  },
};

module.exports = resolvers;
