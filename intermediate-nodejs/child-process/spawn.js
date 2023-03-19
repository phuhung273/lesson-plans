const { spawn } = require('child_process');
const http = require('http');
const port = 8000;

function handle(req, res) {
    req.on('data', chunk => {
    });

    req.on('end', () => {
        const command = spawn('cd', [], { shell: true });
        command.stdout.on('data', data => {
            res.write(data.toString());
        })

        command.stdout.on('close', code => {
            res.end();
        })
    });
}

const server = http.createServer(handle);

server.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})