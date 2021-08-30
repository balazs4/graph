import { graphql, buildSchema } from 'graphql';

const schema = buildSchema(`type Query { hello: String }`);
const root = { hello: () => `world` };
export default (request) => graphql(schema, request, root);
