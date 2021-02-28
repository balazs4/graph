const { graphql, buildSchema } = require('graphql');

const schema = buildSchema(`type Query { hello: String }`);
const root = { hello: () => `world` };
module.exports = (request) => graphql(schema, request, root);
