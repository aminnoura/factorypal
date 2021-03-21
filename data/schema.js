const { makeExecutableSchema } = require("graphql-tools");
const resolvers = require("./resolvers");

// use a better naming for list based on the list

const typeDefs = `
	type Query {
		performanceData: [performanceDataType]!
	}
	type performanceDataType {
		label: String!
		value: Float!
		type: VALUE_TYPE!
		description: String!
		category: Category!
	}
	enum VALUE_TYPE {
		percentage
		number
		secs
		minutes
		hours
	}
	enum Category {
		efficiency
		shift
		downtime
	}
`;

const schema = makeExecutableSchema({ typeDefs, resolvers });

module.exports = schema;