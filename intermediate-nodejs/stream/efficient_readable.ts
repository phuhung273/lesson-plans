import { Readable } from "stream";

let currentCharCode = 65; // A

const readStream = new Readable({
  read(size) {
    this.push(String.fromCharCode(currentCharCode));
    currentCharCode++;
    if (currentCharCode > 90) {
      this.push(null);
    }
  },
});

readStream.pipe(process.stdout);
