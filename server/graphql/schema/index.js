const {buildSchema} = require('graphql');

module.exports = buildSchema(
`
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

    type RootQuery{
        appt: [Appt!]!
        bookings: [Booking!]!
    }

    type RootMutation {
        createAppt(apptInput: ApptInput): Appt
        createUser(userInput: UserInput): User
        bookAppt(apptId: ID!): Booking!
        cancelAppt(bookingId: ID!): Appt!
    }
        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `)