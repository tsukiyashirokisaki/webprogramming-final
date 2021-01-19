import mongoose from 'mongoose'
const Schema = mongoose.Schema

const PokemonDBSchema = new Schema({
    pokIndex:   { type: Number, required: true },
    name:       { type: String, required: true },
    type:       [{ type: String, required: true }],
    skill:      [{ type: String, required: false }],
    points:     [{ type: Number, required: true }],           // basic points [ATT, DEF, STA]
    evolution:  [{ type: String, required: false }],    // list of evolutions
    maxHp:      { type: Number, required: true },
    img:        { type: String, required: true }        // img file name
})

const PokemonDB = mongoose.model('PokemonDB', PokemonDBSchema)

export default PokemonDB