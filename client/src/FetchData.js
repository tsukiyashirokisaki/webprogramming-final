import gql from 'graphql-tag';
const FindUserByName = gql`
query($name: String!){
    findUserByName(name: $name){
        name
        backpack{
            _id
            pokIndex
            name
            nickname
            cp
            type
            skills{
                name
                type
                damage
            }
            evolution
            maxHp
            hp
            attValue
            staValue
            defValue
        }
    }
}
`

const UsersQuery = gql`
    query{
        users{
            name
        }
    }
`

const SignUp = gql`
    mutation($name: String!, $password: String!){
        signUp(name: $name, password: $password) {
            name
            backpack{
                _id
                pokIndex
                name
                nickname
                cp
                type
                skills{
                    name
                    type
                    damage
                }
                evolution
                maxHp
                hp
                attValue
                staValue
                defValue
        }
    }
}
`

const LogIn = gql`
    query($name: String!, $password: String!){
        login(name: $name, password: $password) {
            name
            backpack{
                _id
                pokIndex
                name
                nickname
                cp
                type
                skills{
                    name
                    type
                    damage
                }
                evolution
                maxHp
                hp
                attValue
                staValue
                defValue
        }
    }
}
`

const RandomPop = gql`
mutation{
    randomPop{
        _id
        pokIndex
        name
        nickname
        cp
        type
        skills{
            name
            type
            damage
        }
        evolution
        maxHp
        hp
        attValue
        staValue
        defValue
    }
}
`
const AddPokByUser = gql`
mutation AddPokByUser($userName: String!, $pokId: ID!){
    addPokByUser(userName: $userName, pokId: $pokId){
        name
    }
} `

const UpdateCp = gql`
mutation UpdateCp($pokId: ID!, $cp: Float!){
    updateCp(pokId: $pokId, cp: $cp){
        _id
        cp
    }
} `
const UpdateHp = gql`
mutation UpdateHp($pokId: ID!, $hp: Int!){
    updateHp(pokId: $pokId, hp: $hp){
        _id
        hp
    }
} `

export { FindUserByName, UsersQuery, SignUp, LogIn, RandomPop, AddPokByUser, UpdateCp, UpdateHp }

