import {ApolloServer, gql} from '@apollo/server'

const personas = [
    {
      id: "d3d4f60a-2b60-4b6c-a95c-7a2d78dbba39",
      name: "Ana Martínez",
      phone: "555-2345",
      street: "Avenida de la Paz 45",
      city: "Madrid"
    },
    {
      id: "b39eec90-7241-4d42-a77b-1b44db8d9999",
      name: "Luis Fernández",
      street: "Calle del Sol 98",
      city: "Barcelona"
    },
    {
      id: "a29c4c5b-21c6-4d8d-a9d7-fc573e2e5c3a",
      name: "Sofía González",
      phone: "555-9876",
      street: "Paseo del Prado 12",
      city: "Sevilla"
    }
  ];
  
  
const typeDef = gql `
type Person {
  name: String!
  phone: String    
  street: String!
  city: String!
  id: ID!
  }

  type Query { 
  personCount: Int!
  allPersons: [Person]!
  }
`

const resolvers = {
    Query: { 
        personCount: () => personas.length,
        allPersons: () => personas
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.listen().then(({url}) => {
    console.log(`🚀 Server ready at ${url}`)
})