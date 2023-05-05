const { ApolloServer, gql } = require("apollo-server");
const fs = require("fs");
const path = require("path");

// hackernewsの1つ１つの投稿
let links = [
  {
    id: "link-0",
    description: "Fullstack tutorial for GraphQL",
    url: "https://www.howtographql.com/",
  },
];

// resolver
const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: () => links,
  },

  Mutation: {
    post: (parent, args) => {
      let idCount = links.length;
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url,
      };
      links.push(link);
      return link;
    },
  },
};

const server = new ApolloServer({
  typeDefs: fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf8"),
  resolvers,
});

server.listen().then(({ url }) => console.log(`Server is running on ${url}`));
