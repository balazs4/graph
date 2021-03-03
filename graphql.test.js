const assert = require('assert');
const graphql = require('./graphql');

test('{ hello } query should return { "hello": "world"} data', async () => {
  const actual = JSON.parse(JSON.stringify(await graphql('{hello}')));
  const expected = { data: { hello: 'world' } };
  assert.deepStrictEqual(actual, expected);
});
