import { GraphQLServer, PubSub } from 'graphql-yoga'
import { typeDefs, resolvers } from './schema'
import mongoose from 'mongoose'
require('dotenv-defaults').config()
const pubsub = new PubSub()

if (!process.env.MONGO_URL) {
    console.error('Missing MONGO_URL!!!')
    process.exit(1)
}
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection

const graphQLServer = new GraphQLServer({
    typeDefs,
    resolvers,
    context: {
        db,
        pubsub
    }
})

db.on('error', (error) => {
    console.error(error)
})
db.once('open', () => {
    console.log('MongoDB connected!')

    const PORT = process.env.port || 4000

    graphQLServer.start(PORT, () => {
        console.log(`Listening on http://localhost:${PORT}`)
    })

    console.log('Please refer to ./server/commandRef.md for a guide on the commands.');
})