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
export {FindUserByName,UsersQuery}