const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const { buildSchema } = require('graphql');
const PORT = 3001;
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Appt = require('./models/appt');
const User = require('./models/user');

const app = express();

const appt = apptIds => {
    return Appt.find({}).then().catch()
}

const user = userId => {
    return User.findById(userId)
    .then(user => {
        return {...user._doc, id: user.id}
    })
    .catch(err => {
        throw err;
    })
}

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
    `),
    rootValue: {
        appt: () => {
           return Appt.find()
            .then(appt => {
                return appt.map(appointment => {
                    return {
                        ...appointment._doc, 
                        _id: appointment.id,
                        creator: user.bind(this, appointment._doc.creator)
                    };
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
               time: args.apptInput.time,
               creator: '5fff0cf5e3818d74dfc84230'
        });
        let createdAppt;
          return appointment
            .save()
            .then(result => {
                createdAppt = { ...result._doc,  _id: result.id }
            return User.findById('5fff0cf5e3818d74dfc84230')
               
           })
           .then(user => {
            if (!user) {
                throw new Error('User does not exist.')
            } 
            user.createdAppts.push(appointment);
            return user.save();
           })
           .then(result => {
            return createdAppt;
           })
            .catch(err=> {
               console.log(err);
               throw err;
           });
           
        },
        createUser: (args) => {
            //find if the user exists
            return User.findOne({email: args.userInput.email})
            .then(user => {
                if (user) {
                    throw new Error('User has already been created.')
                } 
                return bcrypt
                .hash(args.userInput.password, 12)
                .then(
                    hashedPassword => {
                        const user = new User({
                            email: args.userInput.email,
                            password: hashedPassword
                        });
                        return user.save();
                    })
                    .then(result => {
                        return {...result._doc, password: null, _id: result.id}
                    })
                .catch(err => {
                    throw err;
                });
            })
   
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




