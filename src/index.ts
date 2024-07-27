import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';


const books = [
  {
    id: "d3d4f60a-2b60-4b6c-a95c-7a2d78dbba39",  
    title: 'The Awakening',
    author: 'Kate Chopin',
    description: 'A novel about a woman\'s self-discovery in the 19th century.',
    quantity: 4,
  },
  { 
    id: "a29c4c5b-21c6-4d8d-a9d7-fc573e2e5c3a",  
    title: 'City of Glass',
    author: 'Paul Auster',
    description: 'A detective story and existential meditation on identity.',
    quantity: 2,
  },
  {
    id: "e8b8c780-6a8d-4b68-9a5b-3f4f8c5e5b8a",
    title: '1984',
    author: 'George Orwell',
    description: 'A dystopian novel set in a totalitarian society.',
    quantity: 5,
  },
  {
    id: "c1f7b77a-894a-41e9-9f88-2e5c7d6e5f8b",
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    description: 'A classic novel about love and societal expectations.',
    quantity: 3,
  },
  {
    id: "d7f9b98c-1e8f-4b7a-9c8e-7d2f8c5e9d7a",
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    description: 'A novel about racial injustice in the Deep South.',
    quantity: 6,
  },
  {
    id: "f3e7b88a-5b8d-4a9c-8d6e-3f7c8e5b9d8a",
    title: 'Moby-Dick',
    author: 'Herman Melville',
    description: 'A novel about the voyage of the whaling ship Pequod.',
    quantity: 2,
  },
  {
    id: "a8f9b97c-2d8f-4c7a-9c8e-8e7c5d8f9a7b",
    title: 'War and Peace',
    author: 'Leo Tolstoy',
    description: 'A historical novel that chronicles the French invasion of Russia.',
    quantity: 4,
  },
  {
    id: "b9e8c780-7a8d-4a68-9b5c-3f8e7c5d8b7a",
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    description: 'A novel about the American Dream and the Roaring Twenties.',
    quantity: 7,
  },
  {
    id: "c8d7b97a-2e8f-4b6a-9d8e-7f8c5d9a8e7b",
    title: 'The Catcher in the Rye',
    author: 'J.D. Salinger',
    quantity: 5,
  },
  {
    id: "d9f8b88c-3a8d-4b7a-9c8e-8f7e5d8c9b7a",
    title: 'The Odyssey',
    author: 'Homer',
    description: 'An epic poem about the journey of Odysseus.',
    quantity: 3,
  }
];

const typeDefs = `#graphql
  type Book {
    id: ID!
    title: String!
    author: String!
    description: String
    quantity: Int!
    detail: String!
  }

  type Query {
    bookCount: Int!
    books: [Book]!
    findBook(title: String!): Book
  }
`;

const resolvers = {
    Query: {
      books: () => books,
      bookCount: () => books.length,
      findBook: (root, args) => {
        const { title } = args
        return books.find(book => book.title === title)
      }
    },
    Book: {
      detail: (root) => `${root.title} by ${root.author} `
    },   //root es lo que se resolvio antes, es en realidad un prev
};



const server = new ApolloServer({
    typeDefs,
    resolvers,
});
  

const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
});
  
console.log(`🚀  Server ready at: ${url}`);  
console.log(`🚀  Server ready at: ${url}`);  

