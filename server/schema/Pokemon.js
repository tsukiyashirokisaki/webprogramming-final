import { gql } from 'apollo-server'
import Pokemon from '../models/Pokemon'

const typeDefs = gql`
    type Pokemon {
        _id: ID!
        pokIndex: Int!
        name: String!
        nickname: String!
        cp: Int!
        type: [String!]!
        skill: [String!]!
        evolution: [String]!
        maxHp: Int!
        hp: Int!
        attValue: Int!
        defValue: Int!
        staValue: Int!
    }

    extend type Query {
        findPokById(_id: ID!): Pokemon
    }
`

const resolvers = {
    Query: {
        findPokById: async (parent, { _id }, context) => await Pokemon.findOne({ _id: _id })
    }
}

export {
    typeDefs,
    resolvers
}