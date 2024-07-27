import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';


const books = [
    {
      id: "d3d4f60a-2b60-4b6c-a95c-7a2d78dbba39",  
      title: 'The Awakening',
      author: 'Kate Chopin',
    },
    { 
      id: "a29c4c5b-21c6-4d8d-a9d7-fc573e2e5c3a",  
      title: 'City of Glass',
      author: 'Paul Auster',
    },
  ];


const typeDefs = `#graphql
  type Book {
    id: ID!
    title: String!
    author: String!
  }

  type Query {
    books: [Book]
  }
`;

const resolvers = {
    Query: {
      books: () => books,
    },
};


const server = new ApolloServer({
    typeDefs,
    resolvers,
});
  

const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
});
  
console.log(`🚀  Server ready at: ${url}`);  