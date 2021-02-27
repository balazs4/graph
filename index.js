const { graphql, buildSchema } = require('graphql');

const schema = buildSchema(`type Query { hello: String }`);
const root = { hello: () => `world` };
const resolve = (request) => graphql(schema, request, root);

const { createServer } = require('http');
const { parse } = require('url');
const { PORT = 3000 } = process.env;

const fromurl = (req) => {
  const url = parse(req.url);
  if (url.query === null || url.query === undefined) return '';

  const { query = '' } = url.query
    .split('&')
    .map((kv) => kv.split('='))
    .reduce((params, [key, value]) => ({ ...params, [key]: value }), {});
  return query;
};

const frombody = async (req) => {
  return new Promise((resolve, reject) => {
    const raw = [];
    req
      .on('data', (chunk) => raw.push(chunk))
      .on('end', () => resolve(Buffer.concat(raw).toString('utf-8')));
  });
};

createServer(async (req, res) => {
  const request = req.method === 'GET' ? fromurl(req) : await frombody(req);
  if (request === '') {
    return res
      .writeHead(400, { 'content-type': 'text/plain' })
      .end('Bad request', 'utf-8');
  }
  const result = await resolve(request);
  return res
    .writeHead(200, { 'content-type': 'application/json' })
    .end(JSON.stringify(result), 'utf-8');
}).listen(PORT, () => {
  console.log(`Server listening...${PORT}`);
});
