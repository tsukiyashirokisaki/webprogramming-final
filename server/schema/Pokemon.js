import { gql } from 'apollo-server'
import Pokemon from '../models/Pokemon'

const typeDefs = gql`
    type Skill {
        name: String!
        type: String!
        damage: Int!
    }
    input SkillInput {
        name: String!
        type: String!
        damage: Int!
    }
    type Pokemon {
        _id: ID!
        pokIndex: Int!
        name: String!
        nickname: String!
        cp: Float!
        type: [String!]!
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
        addPok(pokIndex: Int!
               name: String!
               nickname: String
               cp: Int!
               type: [String!]
               skills: [SkillInput]!
               evolution: [String!]
               maxHp: Int!
               baseATT: Int!
               baseDEF: Int!
               baseSTA: Int!): Pokemon
        # TODO
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
    },
    Mutation: {
        addPok: async (parent, { pokIndex, name, nickname, cp, type, skills, evolution, maxHp, baseATT, baseDEF, baseSTA }, context) => {
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

            return await data.save()
        },
        // TODO
        randomPop: async (parent, args, context) => { },
        curePok: async (parent, { pokId }, context) => {
            var pok = await Pokemon.findOne({ _id: pokId })
            pok.hp = pok.maxHp
            return await pok.save()
        },
        updateHp: async (parent, { pokId, hp }, context) => await Pokemon.findByIdAndUpdate({ _id: pokId }, { hp: hp }, { new: true, useFindAndModify: false }),
        updateCp: async (parent, { pokId, cp }, context) => await Pokemon.findByIdAndUpdate({ _id: pokId }, { cp: cp }, { new: true, useFindAndModify: false }),
        // TODO
        evolution: async (parent, { pokId, cp }, context) => { },
        deletePok: async (parent, { pokId }, context) => {
            var delMsg = await Pokemon.deleteOne({ _id: pokId })
            if(delMsg.deletedCount == 0) throw new Error(`No such Pokemon!! pokId=${pokId}`)
            return true
        }
    }
}

export {
    typeDefs,
    resolvers
}