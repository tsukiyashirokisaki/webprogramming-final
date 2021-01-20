import { gql } from 'apollo-server'
import Pokemon from '../models/Pokemon'
import PokemonDB from '../models/PokemonDB'

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
        type: [String]!
        skills: [Skill]!
        evolution: [String]
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
               type: [String]!
               skills: [SkillInput]!
               evolution: [String]
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

const randomPickOne = (array) => {
    const random = Math.floor(Math.random() * array.length);
    return array[random]
}

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
                pointATT: baseATT,
                pointDEF: baseDEF,
                pointSTA: baseSTA,
                ivATT: baseATT,
                ivDEF: baseDEF,
                ivSTA: baseSTA,
            })

            return await data.save()
        },
        randomPop: async (parent, args, context) => {
            var count = await PokemonDB.countDocuments()
            var rand = Math.floor(Math.random() * count);
            var pokData = await PokemonDB.findOne().skip(rand)

            var data = new Pokemon({
                pokIndex: pokData.pokIndex,
                name: pokData.name,
                nickname: pokData.name,
                cp: Math.floor(Math.random() * 300) + 100,
                type: pokData.type,
                // TODO
                skills: pokData.skills,
                evolution: pokData.evolution,
                maxHp: pokData.maxHp,
                hp: pokData.maxHp,
                pointATT: pokData.pointATT,
                pointDEF: pokData.pointDEF,
                pointSTA: pokData.pointSTA,
                ivATT: Math.floor(Math.random() * 15),
                ivDEF: Math.floor(Math.random() * 15),
                ivSTA: Math.floor(Math.random() * 15)
            })

            return await data.save()
        },
        curePok: async (parent, { pokId }, context) => {
            var pok = await Pokemon.findOne({ _id: pokId })
            pok.hp = pok.maxHp
            return await pok.save()
        },
        updateHp: async (parent, { pokId, hp }, context) => await Pokemon.findByIdAndUpdate({ _id: pokId }, { hp: hp }, { new: true, useFindAndModify: false }),
        updateCp: async (parent, { pokId, cp }, context) => await Pokemon.findByIdAndUpdate({ _id: pokId }, { cp: cp }, { new: true, useFindAndModify: false }),
        evolution: async (parent, { pokId, cp }, context) => {
            var pok = await Pokemon.findOne({ _id: pokId })
            if(!pok['evolution']) throw new Error('This Pokemon has no evolutions!!')
            var evolPokDB = await PokemonDB.findOne({ name: randomPickOne(pok['evolution']) })

            pok.name = evolPokDB.name
            pok.cp = pok.cp + 150
            pok.type = evolPokDB.type
            // TODO
            pok.skills = evolPokDB.skills
            pok.evolution = evolPokDB.evolution
            pok.maxHp = evolPokDB.maxHp
            pok.hp = evolPokDB.maxHp
            pok.pointATT = evolPokDB.pointATT
            pok.pointDEF = evolPokDB.pointDEF
            pok.pointSTA = evolPokDB.pointSTA

            return await pok.save()
        },
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