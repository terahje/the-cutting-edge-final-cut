const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const { buildSchema } = require('graphql');
const PORT = 3001;

const app = express();

app.use('/graphql', graphqlHTTP({
    schema: buildSchema(`
    type RootQuery{
        appt: [String!]!
    }

    type RootMutation {
        createAppt(name: String): String
    }
        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `),
    rootValue: {
        appt: () => {
            //appt resolver
            return ['Hair Cut', 'Permanent']
        },
        createApp: (args) => {
            //create appt resolver
            const apptName = args.name;
            return apptName;
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


