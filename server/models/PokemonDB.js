import mongoose from 'mongoose'
const Schema = mongoose.Schema
import fs from 'fs'

const PokemonDBSchema = new Schema({
    pokIndex:   { type: Number, required: true },
    name:       { type: String, required: true },
    type:       [{ type: String, required: true }],
    skills:     [{
                    name: { type: String, required: true },
                    type: { type: String, required: true },
                    damage: { type: Number, required: true }
                }],
    pointATT:   { type: Number, required: true },
    pointDEF:   { type: Number, required: true },
    pointSTA:   { type: Number, required: true },
    evolution:  [{ type: String, required: false }],    // list of evolutions
    maxHp:      { type: Number, required: true }
})

const PokemonDB = mongoose.model('PokemonDB', PokemonDBSchema)

const checkAndAddPokDB = async () => {
    if (await PokemonDB.exists({})) return true

    let rawPokData = fs.readFileSync('./src/pokemons_data.json')
    let rawSkillDAta = fs.readFileSync('./src/pokemons_skill.json')
    let pokData = JSON.parse(rawPokData)
    let skillData = JSON.parse(rawSkillDAta)

    for (let id in pokData) {
        let skills = []
        for (let skillName of pokData[id]['skill']) {
            try{
                skills.push({
                    name: skillName,
                    type: skillData[skillName]['type'],
                    damage: skillData[skillName]['DMG']
                })
            } catch(err) {
                console.error(`Skill error in pokemon id: ${id}`)
                console.error(err)
                console.error(`Skip this skill: ${skillName}`)
                continue
            }
        }

        let pok = new PokemonDB({
            pokIndex: pokData[id]['id'],
            name: pokData[id]['name'],
            type: pokData[id]['type'],
            skills: skills,
            pointATT: pokData[id]['points']['ATT'],
            pointDEF: pokData[id]['points']['DEF'],
            pointSTA: pokData[id]['points']['STA'],
            evolution: pokData[id]['evolution'],
            maxHp: pokData[id]['maxHP']
        })

        await pok.save()
    }
    
    console.log('PokmonDB established!!')
    return false
}

export default PokemonDB
export { checkAndAddPokDB }