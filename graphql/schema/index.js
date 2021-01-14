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
    }

    type RootMutation {
        createAppt(apptInput: ApptInput): Appt
        createUser(userInput: UserInput): User
    }
        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `)