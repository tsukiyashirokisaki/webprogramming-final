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


const SignUp = gql`
    mutation($name: String!, $password: String!){
        signIn(name: $name, password: $password) {
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

const LogIn = gql`
    query($name: String!, $password: String!){
        login(name: $name, password: $password) {
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

export { FindUserByName, UsersQuery, SignUp, LogIn }