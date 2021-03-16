const resolvers = {
    Query: {
		list: (_,args) => {
			return [
				{
					name: "amin"
				}
			]
		},
	}
};

module.exports = resolvers;
