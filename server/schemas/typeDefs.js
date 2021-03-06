const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User {
    _id: ID
    username: String!
    email: String!
    password: String!
    savedBooks: [Books]
}
type Books {
    bookId: ID!
    authors: [String]
    description: String!
    image: String
    link: String
    title: String!
}
type Auth {
    token: ID!
    user: User
}

type Query {
    me:User 
}

type Mutation {
    login(email: String!, password: String!): Auth
    saveBook(bookData: BookInput!): User
    deleteBook(book: ID!): User
    createUser(email: String!, username: String!, password: String!): Auth
}

input BookInput {
    authors: [String]
    bookID: String!
    description: String!
    image: String
    link: String
    title: String
}
`;

module.exports = typeDefs;