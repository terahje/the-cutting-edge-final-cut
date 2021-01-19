const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Category {
    _id: ID
    name: String
  }

  type Style {
    _id: ID
    name: String
    description: String
    image: String
    quantity: Int
    price: Float
    category: Category
  }

  type Order {
    _id: ID
    purchaseDate: String
    styles: [Style]
  }

  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    orders: [Order]
  }

  type Checkout {
    session: ID
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    categories: [Category]
    styles(category: ID, name: String): [Style]
    style(_id: ID!): Style
    user: User
    order(_id: ID!): Order
    checkout(styles: [ID]!): Checkout
  }

  type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    addOrder(styles: [ID]!): Order
    updateUser(firstName: String, lastName: String, email: String, password: String): User
    updateStyle(_id: ID!, quantity: Int!): Style
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;