const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const { buildSchema } = require('graphql');
const PORT = 3001;
const mongoose = require('mongoose');
const Appt = require('./models/appt');


const app = express();


app.use('/graphql', graphqlHTTP({
    schema: buildSchema(`
    type Appt {
        _id: ID!
        title: String!
        description: String!
        category: String!
        price: Float!
        date: String!
        time: String!
    }
    
    input ApptInput {
        title: String!
        description: String!
        category: String!
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
           return Appt.find()
            .then(appt => {
                return appt.map(appointment => {
                    return {...appointment._doc, _id: appointment.id };
                });
            }

            )
            .catch(err => {
                throw err;
            })
        },

        //create our appointments
        createAppt: (args) => {
       
        const appointment = new Appt({
               title: args.apptInput.title,
               description: args.apptInput.description,
               category: args.apptInput.category,
               price: +args.apptInput.price,
               date: new Date(args.apptInput.date),
               time: args.apptInput.time
        });
          return appointment
            .save()
           .then(result => {
               console.log(result);
               return { ...result._doc,  _id: result.id };
           })
           .catch(err=> {
               console.log(err);
               throw err;
           });
           
        }
        
    },
    graphiql: true
}));

app.get('/', (req, res, next) => {
    res.send('Hello World');
})

mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.m2yyl.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`)
.then(
    app.listen(PORT, () => {
        console.log(`🌎 API server running on port ${PORT}!`);
    })
).catch(err => {
    console.log(err);
})




