import { deepStrictEqual } from 'assert';
import graphql from './graphql.js';

const data = (x) => {
  return { data: Object.setPrototypeOf(x, null) };
};

test('{ hello } query should return { "hello": "world"} data', async () => {
  const actual = await graphql('{hello}');
  const expected = data({ hello: 'world' });
  deepStrictEqual(actual, expected);
});
