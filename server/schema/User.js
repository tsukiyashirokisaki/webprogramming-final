import { gql } from 'apollo-server'
import User from '../models/User'

const typeDefs = gql`
    type User {
        _id: ID!
        name: String!
    }

    extend type Query {
        findUserById(_id: ID!): User
        findUserByName(name: String!): User
        users: [User]
    }

    extend type Mutation {
        addUser(name: String!): User
    }
`

const resolvers = {
    Query: {
        findUserById: async (parent, { _id }, context) => await User.findOne({ _id: _id }),
        findUserByName: async (parent, { name }, context) => await User.findOne({ name: name }),
        users: async (parent, args, context) => await User.find()
    },
    Mutation: {
        addUser: async (parent, { name }, context) => {
            var nameDuplicate = await User.findOne({ name: name })
            if(nameDuplicate) throw new Error('Name already exists!!')
            
            var data = new User({
                name: name
            })

            return await data.save()
        }
    }
}

export {
    typeDefs,
    resolvers
}