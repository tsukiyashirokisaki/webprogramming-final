import { gql } from 'apollo-server'
import User from '../models/User'
import { randomPop } from './Pokemon'
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
        signUp(name: String!, password: String!): User
        addPokByUser(userName: String!, pokId: ID!): User!
        deletePokByUser(userName: String!, pokId: ID!): User!
    }
`

const checkUserExists = async (userName) => {
    var user = await User.findOne({ name: userName }).populate('backpack')
    if (!user) throw new Error('User does not exist!!')
    return user
}

const resolvers = {
    Query: {
        login: async (parent, { name, password }, context) => {
            var user = await checkUserExists(name)
            if(bcrypt.compareSync(password, user.password) != true) throw new Error('Password wrong!!')
            return user
        },
        findUserById: async (parent, { _id }, context) => await User.findOne({ _id: _id }).populate('backpack'),
        findUserByName: async (parent, { name }, context) => await User.findOne({ name: name }).populate('backpack'),
        users: async (parent, args, context) => await User.find().populate('backpack')
    },
    Mutation: {
        signUp: async (parent, { name, password }, context) => {
            var nameDuplicate = await User.findOne({ name: name })
            if (nameDuplicate) throw new Error('Name already exists!!')
            const hashed = bcrypt.hashSync(password)
            var data = new User({
                name: name,
                backpack: [],
                password: hashed
            })

            var pok = await randomPop()
            data.backpack.push(pok._id)
            await data.save()
            return await User.findOne({ name: name }).populate('backpack')
        },
        addPokByUser: async (parent, { userName, pokId }, context) => {
            var user = await checkUserExists(userName)
            var data = user.backpack.find(pok => pok._id == pokId)
            if (data) throw new Error('Pokemon already in backpack!!')
            user.backpack.push(pokId)
            await user.save()
            return await User.findOne({ name: userName }).populate('backpack')
        },
        deletePokByUser: async (parent, { userName, pokId }, context) => {
            var user = await checkUserExists(userName)
            user.backpack = user.backpack.filter(item => item._id != pokId)
            await user.save()

            var delMsg = await Pokemon.deleteOne({ _id: pokId })
            if (delMsg.deletedCount == 0) throw new Error(`No such Pokemon!! pokId=${pokId}`)

            return await User.findOne({ name: userName }).populate('backpack')
        }
    }
}

export {
    typeDefs,
    resolvers
}