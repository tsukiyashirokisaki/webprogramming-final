import { gql } from 'apollo-server'
import PokemonDB from '../models/PokemonDB'

const typeDefs = gql`
    type PokemonDB {
        _id: ID!
        pokIndex: Int!
        name: String!
        type: [String!]!
        skill: [String]!
        points: [Int!]!
        evolution: [String]!
        maxHp: Int!
        img: String!
    }

    extend type Query {
        getPokDBByPokId(pokIndex: Int!): PokemonDB
        randomPopPokDB: PokemonDB
        pokemonDBs: [PokemonDB]
    }

    extend type Mutation {
        addPokDB(pokIndex: Int!
                 name: String!
                 type: [String!]!
                 skill: [String]!
                 points: [Int!]!
                 evolution: [String]!
                 maxHp: Int!
                 img: String!): PokemonDB
    }
`

const resolvers = {
    Query: {
        getPokDBByPokId: async (parent, { pokIndex }, context) => await PokemonDB.findOne({ pokIndex: pokIndex }),
        randomPopPokDB: async (parent, args, context) => {
            // TODO
        },
        pokemonDBs: async (parent, args, context) => await PokemonDB.find()
    },
    Mutation: {
        addPokDB: async (parent, { pokIndex, name, type, skill, points, evolution, maxHp, img }, context) => {
            var data = new PokemonDB({
                pokIndex: pokIndex,
                name: name,
                type: type,
                skill: skill,
                points: points,
                evolution: evolution,
                maxHp: maxHp,
                img: img
            })

            return await data.save()
        }
    }
}

export {
    typeDefs,
    resolvers
}