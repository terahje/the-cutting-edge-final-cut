const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const { buildSchema } = require('graphql');
const PORT = 3001;

const app = express();

const appt = [];

app.use('/graphql', graphqlHTTP({
    schema: buildSchema(`
    type Appt {
        _id: ID!
        title: String!
        description: String!
        price: Float!
        date: String!
        time: String!
    }
    
    input ApptInput {
        title: String!
        description: String!
        price: Float!
        date: String!
        time: String!
    } 

    type RootQuery{
        appt: [Appt!]!
    }

    type RootMutation {
        createAppt(apptInput: ApptInput): Appt
    }
        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `),
    rootValue: {
        appt: () => {
            //appt resolver
            return appt;
        },
        createAppt: (args) => {
           const appointment = {
               _id: Math.random().toString(),
               title: args.apptInput.title,
               description: args.apptInput.description,
               price: +args.apptInput.price,
               date: args.apptInput.date,
               time: args.apptInput.time
           }
           appt.push(appointment);
           return appointment;
        }
        
    },
    graphiql: true
}));

app.get('/', (req, res, next) => {
    res.send('Hello World');
})


app.listen(PORT, () => {
    console.log(`🌎 API server running on port ${PORT}!`);
});


