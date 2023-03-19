const express = require('express');
const app = express();
const port = 8000;

app.use(express.json());

const { promisify } = require('util');
const { readFile } = require('fs');
const readFilePromise = promisify(readFile);
const { generateKeyPair, privateDecrypt } = require('crypto');
const generateKeyPairPromise = promisify(generateKeyPair);

app.post('/login', async (req, res) => {
    const { privateKey, publicKey } = await generateKeyPairPromise('rsa', {
        modulusLength: 2048,
        publicKeyEncoding: {
            type: 'spki',
            format: 'pem',
        },
        privateKeyEncoding: {
            type: 'pkcs8',
            format: 'pem',
        }
    });

    console.log(privateKey);
    res.send(publicKey);
})

const privateKeyPath = __dirname + '/privateKey.pem';

app.post('/', async (req, res) => {
    // Wrong: do not store private key on the server
    const privateKey = await readFilePromise(privateKeyPath, 'utf-8');
    const decryptedData = privateDecrypt(privateKey, Buffer.from(req.body.message, 'base64')).toString('utf-8');
    res.send(decryptedData);
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})