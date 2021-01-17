const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
// const {graphqlHTTP} = require('express-graphql');
const PORT = process.env.PORT || 3001;
const mongoose = require('mongoose');
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');
const isAuth = require('./middleware/is-auth');
// require("dotenv").config();

const app = express();

app.use(isAuth);

const server = new ApolloServer({
    typeDefs,
    resolvers
  });
  
  server.applyMiddleware({ app });
  
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  
  // Serve up static assets
  app.use('/images', express.static(path.join(__dirname, '../client/images')));
  
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
  }
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  });
  
  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    });
  });


// app.use('/graphql', graphqlHTTP({
//     schema: graphQlSchema,
//     rootValue: graphQlResolvers,
//     graphiql: true
// }));


// mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.m2yyl.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`)
// .then(
//     app.listen(PORT, () => {
//         console.log(`🌎 API server running on port ${PORT}!`);
//     })
// ).catch(err => {
//     console.log(err);
// })