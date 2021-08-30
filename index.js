import http from './http.js';
import graphql from './graphql.js';

const server = http(graphql).listen(process.env.PORT || 3000, () => {
  const listening = server.address();
  console.log({ ...listening });
});
