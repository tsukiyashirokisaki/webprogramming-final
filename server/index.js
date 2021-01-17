import { GraphQLServer, PubSub } from 'graphql-yoga'
import resolvers from './resolvers/index.js'
const pubsub = new PubSub()

const PORT = 4000
const graphQLServer = new GraphQLServer({
    typeDefs: './schema.graphql',
    resolvers,
    context: {
        // db,
        pubsub
    }
})

graphQLServer.start(PORT, ()=> {
    console.log(`Listening on http://localhost:${PORT}`)
})
