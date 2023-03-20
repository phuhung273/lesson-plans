### Most Important

- NodeJS worker thread is not the same as multithreading in others programming languages
- Worker thread, child process usage: [CPU-intensive tasks, not I/O](https://nodejs.org/api/worker_threads.html#worker-threads) (reading file, query database, fetch network is I/O tasks)

### Child process

- Have their own memory
- Ways to use:
  - spawn: run a command using stream API underhood
  - exec: run a command and buffer the whole output into a callback
  - fork: run a node module
  - execFile: run a file

### Worker thread

- Share memory with main thread
- Should equal to number of cpu cores
- Usage: run a module

### Stream

- Process data in chunk instead of storing everything in memory
