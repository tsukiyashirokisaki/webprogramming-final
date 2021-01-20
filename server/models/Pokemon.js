import mongoose from 'mongoose'
const Schema = mongoose.Schema

const PokemonSchema = new Schema({
    pokIndex:   { type: Number, required: true },
    name:       { type: String, required: true },
    nickname:   { type: String, required: true },
    cp:         { type: Number, required: true },
    type:       [{ type: String, required: true }], // list of type name
    skills:     [{
                    name: { type: String, required: true },
                    type: { type: String, required: true },
                    damage: { type: Number, required: true }
                }], // list of skill name
    evolution:  [{ type: String, required: false }], // list of evolution name
    maxHp:      { type: Number, required: true },
    hp:         { type: Number, required: true },
    pointATT:   { type: Number, required: true },
    pointDEF:   { type: Number, required: true },
    pointSTA:   { type: Number, required: true },
    ivATT:      { type: Number, required: true },
    ivDEF:      { type: Number, required: true },
    ivSTA:      { type: Number, required: true }
})

PokemonSchema.virtual('attValue').get(function () {
    return this.cp * (this.pointATT + this.ivATT) || 0
})
PokemonSchema.virtual('defValue').get(function () {
    return this.cp * (this.pointDEF + this.ivDEF) || 0
})
PokemonSchema.virtual('staValue').get(function () {
    return this.cp * (this.pointSTA + this.ivSTA) || 0
})

const Pokemon = mongoose.model('Pokemon', PokemonSchema)

export default Pokemon