import mongoose from 'mongoose'
const Schema = mongoose.Schema

const PokemonSchema = new Schema({
    pokIndex:   { type: Number, required: true },
    name:       { type: String, required: true },
    nickname:   { type: String, required: true },
    cp:         { type: Number, required: true },
    type:       [{ type: String, required: true }], // list of type name
    skill:      [{ type: String, required: true }], // list of skill name
    evolution:  [{ type: String, required: false }], // list of evolution name
    maxHp:      { type: Number, required: true },
    hp:         { type: Number, required: true },
    baseATT:    { type: Number, required: true },
    baseDEF:    { type: Number, required: true },
    baseSTA:    { type: Number, required: true }
})

PokemonSchema.virtual('attValue').get(function () {
    return this.cp * this.baseATT
})
PokemonSchema.virtual('defValue').get(function () {
    return this.cp * this.baseDEF
})
PokemonSchema.virtual('staValue').get(function () {
    return this.cp * this.baseSTA
})

const Pokemon = mongoose.model('Pokemon', PokemonSchema)

export default Pokemon