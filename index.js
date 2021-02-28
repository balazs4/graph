const http = require('./http');
const graphql = require('./graphql');

const server = http(graphql).listen(process.env.PORT || 3000, () => {
  const listening = server.address();
  console.log({ ...listening });
});
