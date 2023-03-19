import { spawn } from 'child_process';
import { createServer, IncomingMessage, ServerResponse } from 'http';
const port = 8000;

function handle(req: IncomingMessage, res: ServerResponse) {
    req.on('data', chunk => {
    });

    req.on('end', () => {
        const command = spawn('cd', [], { shell: true });
        command.stdout.on('data', data => {
            res.write(data.toString());
        })

        command.stdout.on('close', () => {
            res.end();
        })
    });
}

const server = createServer(handle);

server.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})