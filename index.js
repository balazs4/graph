const { createServer } = require('http');
const { PORT = 3000 } = process.env;

const json = async (request) => {
  const string = await new Promise((resolve, reject) => {
    const raw = [];
    request
      .on('data', (chunk) => raw.push(chunk))
      .on('end', () => resolve(Buffer.concat(raw).toString('utf-8')));
  });
  return JSON.parse(string);
};

createServer(async (req, res) => {
  switch (req.headers['content-type']) {
    case 'application/json':
      return res
        .writeHead(200, { 'content-type': 'application/json' })
        .end(JSON.stringify(await json(req)), 'utf-8');

    default:
      return res
        .writeHead(400, { 'content-type': 'text/plain' })
        .end(err.message, 'utf-8');
  }
}).listen(PORT, () => {
  console.log(`Server listening...${PORT}`);
});
