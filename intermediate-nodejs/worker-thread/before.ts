import * as http from "http";
import { parse } from "querystring";
import { URL } from "url";

const server = http.createServer(function (req, res) {
  if (!req.url) {
    return res.writeHead(404).end();
  }

  const url = new URL(req.url, `http://${req.headers.host}`);
  const query = parse(url.search.substring(1));

  if (typeof query.number !== "string") {
    return res.writeHead(400).end();
  }

  const number = parseInt(query.number);

  const startTime = new Date().getTime();
  const sum = sumOfPrimes(number);
  const endTime = new Date().getTime();

  res.write(
    JSON.stringify({
      number: number,
      sum: sum,
      timeTaken: (endTime - startTime) / 1000 + " seconds",
    })
  );
  res.end();
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
