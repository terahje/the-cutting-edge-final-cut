const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Appt {
        _id: ID!
        title: String!
        description: String!
        category: String!
        price: Float!
        date: String!
        time: String!
        creator: User!
    }
    
    type Booking {
        _id: ID!
       appointment: Appt!
       user: User!
       createdAt: String!
       updatedAt: String!

    }
    type User {
        _id: ID!
        email: String!
        password: String
        createdAppts: [Appt!]
    }

    type AuthData {
        userId: ID!
        token: String!
        tokenExpiration: Int!
      }

    input ApptInput {
        title: String!
        description: String!
        category: String!
        price: Float!
        date: String!
        time: String!
    } 

    input UserInput {
        email: String!
        password: String!
    }

    type Query{
        appt: [Appt!]!
        bookings: [Booking!]!
        login(email: String!, password: String!): AuthData!
    }

    type Mutation {
        createAppt(apptInput: ApptInput): Appt
        createUser(userInput: UserInput): User
        bookAppt(apptId: ID!): Booking!
        cancelAppt(bookingId: ID!): Appt!
    }
    
    `;

    module.exports = typeDefs;