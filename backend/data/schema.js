const { makeExecutableSchema } = require("graphql-tools");
const resolvers = require("./resolvers");

const typeDefs = `
	type Query {
		list: [list]!
	}
	type list {
		name: String
	}
`;

const schema = makeExecutableSchema({ typeDefs, resolvers });

module.exports = schema;
