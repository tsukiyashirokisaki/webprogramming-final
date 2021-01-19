import { gql } from 'apollo-server'
import Pokemon from '../models/Pokemon'

const typeDefs = gql`
    type Skill {
        name: String!
        type: String!
        dmage: Int!
    }
    type Pokemon {
        _id: ID!
        pokIndex: Int!
        name: String!
        nickname: String!
        cp: Float!
        type: [String!]!
        # TODO
        skills: [Skill!]!
        
        evolution: [String]!
        maxHp: Int!
        hp: Int!
        attValue: Float!
        staValue: Float!
        defValue: Float!
    }

    extend type Query {
        findPokById(_id: ID!): Pokemon
    }

    extend type Mutation {
        # TODO
        addPok(userName: String!
               pokIndex: Int!
               name: String!
               nickname: String
               cp: Int!
               type: [String!]
               skills: [String!]
               evolution: [String!]
               maxHp: Int!
               baseATT: Int!
               baseDEF: Int!
               baseSTA: Int!): Pokemon
        randomPop: Pokemon!
        updateHp(pokId:ID!, hp:Int!): Pokemon!
        updateCp(pokId:ID!, cp:Int!): Pokemon!
        evolution(pokId:ID!): Pokemon!
        deletePok(pokId:ID!): Boolean!
        curePok(pokId:ID!): Pokemon!
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