const assert = require('assert');
const graphql = require('./graphql');

const data = (x) => {
  return { data: Object.setPrototypeOf(x, null) };
};

test('{ hello } query should return { "hello": "world"} data', async () => {
  const actual = await graphql('{hello}');
  const expected = data({ hello: 'world' });
  assert.deepStrictEqual(actual, expected);
});
