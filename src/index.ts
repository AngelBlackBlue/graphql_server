import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { GraphQLError } from 'graphql';
import { v4 as uuidv4 } from 'uuid';


const persons = [
  {
    id: "d3d4f60a-2b60-4b6c-a95c-7a2d78dbba39",
    name: "John Doe",
    phone: "555-1234",
    street: "123 Elm St",
    city: "Springfield"
  },
  {
    id: "b7f41be7-6e8b-4d6d-a5a4-1f9ed9c2341d",
    name: "Jane Smith",
    phone: "555-5678",
    street: "456 Maple Ave",
    city: "Greenville"
  },
  {
    id: "9f4470b8-734e-4fbb-90bc-29b6f8078d4d",
    name: "Alice Johnson",
    phone: "555-8765",
    street: "789 Oak Dr",
    city: "Fairview"
  },
  {
    id: "ae1d5f25-7a39-481e-8e59-4a9b47a5c8b1",
    name: "Bob Brown",
    phone: "555-4321",
    street: "101 Pine Ln",
    city: "Centerville"
  },
  {
    id: "c3d2e391-593d-4c38-8980-9db8f163cc2e",
    name: "Carol Davis",
    phone: "555-6543",
    street: "202 Birch St",
    city: "Riverside"
  },
  {
    id: "f8a7c6e2-bfc9-45c8-8cbf-ea9f8c96f2d7",
    name: "David Evans",
    street: "303 Cedar Ave",
    city: "Lakeside"
  },
  {
    id: "0c6c48b4-2043-41af-b8bb-4a4d303fb1b1",
    name: "Emma Wilson",
    phone: "555-3456",
    street: "404 Walnut Rd",
    city: "Hilltop"
  },
  {
    id: "2d829baf-2f84-4b2d-94b7-6c6096f4b0d8",
    name: "Frank Harris",
    phone: "555-6789",
    street: "505 Spruce Blvd",
    city: "Meadowbrook"
  },
  {
    id: "5b9c1f1e-64d7-4a4c-8a7d-292d9a93849e",
    name: "Grace Lee",
    street: "606 Fir Ct",
    city: "Brookfield"
  },
  {
    id: "8a9278d9-61c1-4d6f-9889-1f4dcb1f94a7",
    name: "Henry Clark",
    street: "707 Cypress Way",
    city: "Pleasantville"
  }
];


const typeDefs = `#graphql
   
  enum YesNo {
    YES
    NO
  }
  
  type Address {
    street: String!
    city: String!
  }

  type Person {
    id: ID!
    name: String!
    phone: String
    address: Address!
  }

  type Query {
    personCount: Int!
    allPersons(phone: YesNo): [Person]!
    findPerson(name: String!): Person
  }

  type Mutation {
    addPerson(
      name: String!
      phone: String
      street: String!
      city: String!
    ): Person
    editPhone(
      name: String!
      phone: String!
    ): Person
}
`;

const resolvers = {
    Query: {
      personCount: () => persons.length,
      allPersons: (root, args) => {
        if (!args.phone) return persons;
        const byPhone = person => 
           args.phone === 'YES' ? person.phone : !person.phone;
        return persons.filter(byPhone);

      },
      findPerson: (root, args) =>{
        const {name} = args;
        return persons.find(person => person.name === name);
      }
    },

    Person: {
      address: (root) => {
        return { 
          street: root.street,
          city: root.city
        }
      }
    },


    Mutation: { 
      addPerson: (root, args) => {
        if(persons.find(person => person.name === args.name)){ 
          throw new GraphQLError('Title already exists', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.name
            }
          })
        }
        const person = { ...args, id: uuidv4() }
        persons.push(person)
        return person
      },

      editPhone: (root, args) => {
        const personIndex = persons.findIndex(person => person.name === args.name)
        if (personIndex  === -1) { return null }

        const person = persons[personIndex ]
        const updatedPerson = { ...person, phone: args.phone }

        persons[personIndex ] = updatedPerson
        return updatedPerson

      }
        
      

    }

};



const server = new ApolloServer({
    typeDefs,
    resolvers,
});
  

const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
});
  
console.log(`🚀  Server ready at: ${url}`);  


