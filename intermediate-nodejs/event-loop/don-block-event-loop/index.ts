import { createHash, randomBytes } from 'crypto';
import express, { Request, Response } from 'express';

const app = express();
const port = 8000;

// Block
app.get('/compute-sync', (req: Request, res: Response) => {
    console.log('compute sync');
    const hash = createHash('sha256');
    for (let i = 0; i < 10e6; i++) {
        hash.update(randomBytes(100).toString('hex'));
    }
    res.send(hash.digest('hex'));
});

// Still block
app.get('/compute-async', async (req: Request, res: Response) => {
    console.log('compute asynchronously');

    async function asyncUpdate() {
        hash.update(randomBytes(100).toString('hex'));
    }

    const hash = createHash('sha256');
    for (let i = 0; i < 10e6; i++) {
        await asyncUpdate();
    }
    res.send(hash.digest('hex'));
});

// Responsive, but doesn't work hard enough
app.get('/compute-set-timeout', async (req: Request, res: Response) => {
    console.log('compute asynchronously with set timeout');

    async function asyncUpdate() {
        return new Promise<void>((resolve, reject) => {
            setTimeout(() => {
                hash.update(randomBytes(100).toString('hex'));
                resolve();
            })
        })
    }

    const hash = createHash('sha256');
    for (let i = 0; i < 10e6; i++) {
        await asyncUpdate();
    }
    res.send(hash.digest('hex'));
});

// Responsive and hard working
app.get('/compute-set-immediate', async (req: Request, res: Response) => {
    console.log('compute asynchronously with set immediate');

    async function asyncUpdate() {
        return new Promise<void>((resolve, reject) => {
            setImmediate(() => {
                hash.update(randomBytes(100).toString('hex'));
                resolve();
            })
        })
    }

    const hash = createHash('sha256');
    for (let i = 0; i < 10e6; i++) {
        await asyncUpdate();
    }
    res.send(hash.digest('hex'));
});

app.get('/healthcheck', (req: Request, res: Response) => {
    console.log('they check my health');
    res.send('all good!\n');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})