import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { GraphQLError } from 'graphql';
import "./db/db"
import PersonSchema from './models/person';


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
      personCount: () => PersonSchema.collection.countDocuments(), 
  
      allPersons: async (root, args) => {
          return PersonSchema.find({});
      },
  
      findPerson: (root, args) =>{
        const {name} = args;
        return PersonSchema.findOne({name});
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
        const person = new PersonSchema({ ...args });

        if(person){ 
          throw new GraphQLError('Person already exists', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.name
            }
          })
        }

        return person.save()
      },

      editPhone: async (root, args)=> {
        const person = await PersonSchema.findOne({ name: args.name });
        if(!person){ 
          throw new GraphQLError('Person no exists', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.name
            }
          })
        }
        person.phone = args.phone;
        return person.save();


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


