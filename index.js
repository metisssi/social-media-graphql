const { ApolloServer, PubSub } = require('apollo-server')
const mongoose = require('mongoose')
require('dotenv').config();

const typeDefs = require('./grapql/typeDefs.js')
const resolvers = require('./grapql/resolvers/index.js')

const pubsub = new PubSub();

const PORT = process.env.PORT || 5000

const server = new ApolloServer({
    typeDefs,
    resolvers, 
    context: ({ req }) => ({ req, pubsub }),
    introspection: true,
    playground: true,
    cors: {
        origin: process.env.CLIENT_URL || '*',
        credentials: true
    }
})

mongoose
    .connect(process.env.MONGODB)  // Убрали deprecated опции
    .then(() => {
        console.log('MongoDB Connected');
        return server.listen({ port: PORT })
    })
    .then(res => {
        console.log(`Server running at ${res.url}`)
    })
    .catch(err => {
        console.error('Error:', err)
    })