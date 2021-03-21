const { ApolloServer} = require('apollo-server');
const schema = require("./data/schema");

const server = new ApolloServer({
    schema
});

const port = process.env.PORT || 3000;

server.listen(port).then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});