const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const PORT = 3001;
const mongoose = require('mongoose');
const graphQlSchema = require('./graphql/schema/index');
const graphQlResolvers = require('./graphql/resolvers/index');
const isAuth = require('./middleware/is-auth');

const app = express();

app.use(isAuth);


app.use('/graphql', graphqlHTTP({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true
}));


mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.m2yyl.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`)
.then(
    app.listen(PORT, () => {
        console.log(`🌎 API server running on port ${PORT}!`);
    })
).catch(err => {
    console.log(err);
})




