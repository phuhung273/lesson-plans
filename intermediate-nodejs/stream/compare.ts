import express, { Request, Response } from "express";
import { createReadStream, readFile } from "fs";

const app = express();
const port = 8000;

const filePath = __dirname + "/bigfile.txt";

app.get("/normal", (req: Request, res: Response) => {
  readFile(filePath, (err, data) => {
    if (err) {
      return res.send(err);
    }
    res.send(data);
  });
});

app.get("/stream", (req: Request, res: Response) => {
  const stream = createReadStream(filePath);
  stream.pipe(res);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
