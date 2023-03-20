## Why Stream?

Process data in chunk instead of storing everything in memory

### Types of Streams

- Readable: fs.createReadStream
- Writable: fs.createWriteStream
- Duplex: TCP socket
- Transform: zlib for compressing

---

## Usage

```javascript
// Using pipe
readable.pipe(writable);

// Using events
readable.on("data", (chunk) => {
  writable.write(chunk);
});

readable.on("end", () => {
  writable.end();
});
```

### Most used Events of stream

#### Readable

- `data`
- `end`

#### Writable

- `finish`

---

### 2 Modes of Readable: Paused and Flowing

#### Paused mode

- Use `read()` to get data on demand
- Adding a `data` event handler automatically switch to `Flowing` mode

#### Flowing mode

- use `stream.on('data')` to get data
- If no consumer available, data will be lost
- Removing `data` event handler automatically switch to `Paused` mode

> To manually switch between these 2 modes, use `resume()` and `pause()`

## Implementing Stream

### Readable

```
const readStream = new Readable({
  read(size) {
    this.push('test');
    this.push(null); // End signal
  }
});
```

> Always push chunk of data so that the consumer can read on demand. See `inefficient_readable.ts` and `efficient_readable.ts`

<br>

### Writable

```
const writeStream = new Writable({
  write(chunk, encoding, callback) {
    try {
        console.log(chunk);
        callback();
    } catch (err) {
        callback(err);
    }
  }
});
```

### Duplex

```
const duplex = new Duplex({
    read(size) { }
    write(chunk, encoding, callback) { }
})
```

### Transform

```
const upperCaseTransform = new Transform({
    transform(chunk, encoding, callback) {
        this.push(chunk.toString().toUpperCase());
        callback();
    }
})
```
