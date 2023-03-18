const { publicEncrypt } = require('crypto');
const { promisify } = require('util');
const { readFile } = require('fs');
const readFilePromise = promisify(readFile);

const publicKeyPath = './publicKey.pem';

const secretMessage = 'Hello';

async function main() {
    const publicKey = await readFilePromise(publicKeyPath, 'utf-8');

    const encryptedData = publicEncrypt(
        publicKey,
        Buffer.from(secretMessage)
    );

    const data = {
        message: encryptedData.toString('base64'),
    }

    await fetch('http://localhost:8000', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
}


main();