import { gql } from 'apollo-server'
import User from '../models/User'
import Pokemon from '../models/Pokemon'
import bcrypt from 'bcryptjs'

const typeDefs = gql`
    type User {
        _id: ID!
        name: String!
        password: String!
        backpack: [Pokemon]
    }

    extend type Query {
        login(name: String!, password: String!): User
        findUserById(_id: ID!): User
        findUserByName(name: String!): User
        users: [User]
    }

    extend type Mutation {
        signIn(name: String!, password: String!): User
        addPokByUser(userName: String!, pokId: ID!): Boolean!
        deletePokByUser(userName: String!, pokId: ID!): Boolean!
    }
`

const checkUserExists = async (userName) => {
    var user = await User.findOne({ name: userName })
    if(!user) throw new Error('User does not exist!!')
    return user
}

const resolvers = {
    Query: {
        login: async (parent, { name, password }, context) => {
            //FIX: when the frontend is opened, it will send a query with empty username and password, and causes a error in checkUserExists.
            // (Error msg in the backend)
            // The behaviour is seemingly harmless.
            var user = await checkUserExists(name)
            if(bcrypt.compareSync(password, user.password) != true) throw new Error('Password wrong!!')
            // if(password != user.password) throw new Error('Password wrong!!')
            console.log("auth'ed")
            return user
        },
        findUserById: async (parent, { _id }, context) => await User.findOne({ _id: _id }).populate('backpack'),
        findUserByName: async (parent, { name }, context) => await User.findOne({ name: name }).populate('backpack'),
        users: async (parent, args, context) => await User.find().populate('backpack')
    },
    Mutation: {
        signIn: async (parent, { name, password }, context) => {
            var nameDuplicate = await User.findOne({ name: name })
            if (nameDuplicate) throw new Error('Name already exists!!')
            const hashed = bcrypt.hashSync(password)
            var data = new User({
                name: name,
                password: hashed
                // password: password
            })

            return await data.save()
        },
        addPokByUser: async (parent, { userName, pokId }, context) => {
            var user = await checkUserExists(userName)
            if(user.backpack.find(bPokId => bPokId == pokId)) throw new Error('Pokemon already in backpack!!')
            user.backpack.push(pokId)
            await user.save()
            return true
        },
        deletePokByUser: async (parent, { userName, pokId }, context) => {
            var user = await checkUserExists(userName)
            user.backpack = user.backpack.filter(item => item != pokId)
            await user.save()
            return true
        }
    }
}

export {
    typeDefs,
    resolvers
}