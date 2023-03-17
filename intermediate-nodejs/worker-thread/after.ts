import * as http from "http";
import * as os from "os";
import { parse } from "querystring";
import { URL } from "url";
import { Worker } from "worker_threads";

function runWorker(data: any) {
  return new Promise((resolve, reject) => {
    const worker = new Worker(__dirname + "/worker", {
      workerData: data,
    });
    worker.on("message", resolve);
    worker.on("error", reject);
  });
}

async function divideWork(num: number) {
  if (num < 100000) {
    return sumOfPrimes(num);
  }

  const cpus = os.cpus().length;
  const each = Math.floor(num / cpus);

  const promises: Promise<any>[] = [];
  for (let i = 0; i < cpus; i++) {
    promises.push(
      runWorker({
        start: each * i,
        end: each * (i + 1) - 1,
      })
    );
  }

  return Promise.all(promises);
}

const server = http.createServer(async function (req, res) {
  if (!req.url) {
    return res.writeHead(404).end();
  }

  const url = new URL(req.url, `http://${req.headers.host}`);
  const query = parse(url.search.substring(1));

  if (typeof query.number !== "string") {
    return res.writeHead(400).end();
  }

  const num = parseInt(query.number);

  const startTime = new Date().getTime();

  const works = await divideWork(num);

  if (typeof works === "number") {
    return response(works);
  }

  let sum = 0;

  for (const work of works) {
    sum += work.result;
  }

  response(sum);

  function response(result: number) {
    const endTime = new Date().getTime();

    res.write(
      JSON.stringify({
        number: num,
        sum: result,
        timeTaken: (endTime - startTime) / 1000 + " seconds",
      })
    );
    res.end();
  }
});

server.listen(8000);

function sumOfPrimes(n: number) {
  var sum = 0;
  for (var i = 2; i <= n; i++) {
    for (var j = 2; j <= i / 2; j++) {
      if (i % j == 0) {
        break;
      }
    }
    if (j > i / 2) {
      sum += i;
    }
  }
  return sum;
}
