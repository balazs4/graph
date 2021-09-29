const { graphql, buildSchema } = require('graphql');

const schema = buildSchema(`
  type Query {
    hello: String
  }
`);

const resolver = {
  hello: () => `world`,
};

module.exports = (request) => {
  const args = {
    schema: schema,
    source: request,
    rootValue: resolver,
  };
  return graphql(args);
};
