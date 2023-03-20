import { Readable } from "stream";

const readStream = new Readable({
  read(size) {},
});

readStream.push("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
readStream.push(null);

readStream.pipe(process.stdout);
