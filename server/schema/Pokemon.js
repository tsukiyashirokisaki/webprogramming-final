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
        evolution: [String!]!
        maxHp: Int!
        hp: Int!
        attValue: Int!
        defValue: Int!
        staValue: Int!
    }

    extend type Query {
        findPokById(_id: ID!): Pokemon
    }

    extend type Mutation {
        addPok(pokIndex: Int!,
               name: String!
               nickname: String
               cp: Int!
               type: [String!]
               skill: [String!]
               evolution: [String!]
               maxHp: Int!
               baseATT: Int!
               baseDEF: Int!
               baseSTA: Int!): Pokemon
    }
`

const resolvers = {
    Query: {
        findPokById: async (parent, { _id }, context) => await Pokemon.find({ _id: _id })
    },
    Mutation: {
        addPok: async (parent, {pokIndex, name, nickname, cp, type, skill, evolution, maxHp, baseATT, baseDEF, baseSTA }, context) => {
            var data = new Pokemon({
                pokIndex: pokIndex,
                name: name,
                nickname: nickname,
                cp: cp,
                type: type,
                skill: skill,
                evolution: evolution,
                maxHp: maxHp,
                hp: maxHp,
                baseATT: baseATT,
                baseDEF: baseDEF,
                baseSTA: baseSTA
            })

            return await data.save()
        }
    }
}

export {
    typeDefs,
    resolvers
}