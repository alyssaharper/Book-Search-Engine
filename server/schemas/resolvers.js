const { User } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
            const findUser = await User.findOneById(context.user._id);
            return findUser;
            }
            throw new AuthenticationError('Not authorized!')

        }
    },

    Mutation: {
        login:  async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError(`Incorrect Credentials`);
            }

            const correctPW = await user.isCorrectPassword(password);

            if (!correctPW) {
                throw new AuthenticationError('Incorrect Credentials');
            }

            const token = signToken(user);
            return { token, user };
        },
        saveBook: async (parent, { bookData }) => {
            const updatedUser = await User.findOneAndUpdate(
                { $addToSet: { savedBooks: { bookData }}},
                {
                    new: true, 
                    runValidators: true,
                }
            );

            return updatedUser;
        },
        deleteBook: async (parent, { book }) => {
            const updatedUser = await User.findOneAndUpdate(
                { $pull: { savedBooks: { bookId: book } } },
                { new: true} 
            );
            if (!updatedUser) {
                throw new AuthenticationError('Invalid User')
            };

            return updatedUser;
        },
    },
};

module.exports = resolvers