import { gql } from 'apollo-server'
import User from '../models/User'
import Pokemon from '../models/Pokemon'

const typeDefs = gql`
    type User {
        _id: ID!
        name: String!
        backpack: [Pokemon]
        password: String!
    }

    extend type Query {
        # TODO
        login(name: String!, password: String!): User
        
        findUserById(_id: ID!): User
        findUserByName(name: String!): User
        users: [User]
    }

    extend type Mutation {
        addUser(name: String!, password: String!): User
        # TODO
        addPokByUser(userName: String!, pokId: ID!): Pokemon!
        deletePokByUser(userName: String!, pokId: ID!): Boolean!
    }
`

const resolvers = {
    Query: {
        findUserById: async (parent, { _id }, context) => await User.findOne({ _id: _id }).populate('backpack'),
        findUserByName: async (parent, { name }, context) => await User.findOne({ name: name }).populate('backpack'),
        users: async (parent, args, context) => await User.find().populate('backpack')
    },
    Mutation: {
        addUser: async (parent, { name, password }, context) => {
            var nameDuplicate = await User.findOne({ name: name })
            if (nameDuplicate) throw new Error('Name already exists!!')

            var data = new User({
                name: name,
                password: password
            })

            return await data.save()
        },
        // FIX
        addPok: async (parent, { userName, pokIndex, name, nickname, cp, type, skills, evolution, maxHp, baseATT, baseDEF, baseSTA }, context) => {
            var data = new Pokemon({
                pokIndex: pokIndex,
                name: name,
                nickname: nickname || name,
                cp: cp,
                type: type,
                skills: skills,
                evolution: evolution,
                maxHp: maxHp,
                hp: maxHp,
                baseATT: baseATT,
                baseDEF: baseDEF,
                baseSTA: baseSTA
            })

            var pok = await data.save()
            var user = await User.findOne({ name: userName })
            user.backpack.push(pok._id)
            await user.save()
            return pok
        }
    }
}

export {
    typeDefs,
    resolvers
}