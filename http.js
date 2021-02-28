const { createServer } = require('http');
const { parse } = require('url');
const log = require('debug')(`${process.env.npm_package_name}`);

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

module.exports = (graphql) =>
  createServer(async (req, res) => {
    const request = req.method === 'GET' ? fromurl(req) : await frombody(req);
    if (request === '') {
      log(`400 ${req.method} ${req.url}`);
      return res
        .writeHead(400, { 'content-type': 'text/plain' })
        .end('Bad request', 'utf-8');
    }
    const result = await graphql(request);
    log(`200 ${req.method} ${req.url} => graphql: ${request}`);
    return res
      .writeHead(200, { 'content-type': 'application/json' })
      .end(JSON.stringify(result), 'utf-8');
  });
