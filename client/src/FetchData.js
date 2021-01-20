import gql from 'graphql-tag';
const FindUserByName = gql`
query($name: String!){
    findUserByName(name: $name){
        name
        backpack{
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
  addPokByUser(userName:$userName,pokId:$pokId)
}`
export {FindUserByName,UsersQuery,RandomPop,AddPokByUser}