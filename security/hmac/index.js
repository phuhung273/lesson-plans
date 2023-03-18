const { createHmac } = require('crypto');
const http = require('http');
const port = 8000;

function handle(req, res) {

    let body = '';

    const sign = req.headers['x-signature'];
    req.on('data', chunk => {
        body += chunk;
    });

    req.on('end', () => {

        const secret = 'password';
        const hmac = createHmac('sha256', secret).update(body).digest('hex');

        if (sign !== hmac) {
            res.writeHead(400);
            return res.end('invalid signature');
        }
        res.end('hello hmac');
    });
}

const server = http.createServer(handle);

server.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})