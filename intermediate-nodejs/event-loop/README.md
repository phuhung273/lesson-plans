## Phases of Event Loop
- Timers: setTimeout, setInterval
- Pending callbacks: execute I/O callbacks
- Idle, prepare: only use internally
- Poll: retrieve new I/O events, execute I/O callbacks
- Check: setImmediate
- Close callbacks: some close callbacks, e.g. socket.on('close')

### What's inside one phase
- Next tick queue: 
  - Registered by: process.nextTick
  - Must be exhausted before event loop continues
- Microtask queue: 
  - Registered by: Promise, queueMicrotask
  - Must be exhausted before next phase starts

### Facts
- Calling an setImmediate inside the callback of an setImmediate, the later will be executed in the next event loop iteration
- setTimeout(0) is actually setTimeout(1): right from [Nodejs's source code](https://github.com/nodejs/node/blob/v19.4.0/lib/internal/timers.js#L166)

---

## Don't block the event loop
When a callback enqueues another callback that can be handled in the same phase, then it will be handled before moving to the next phase.

#### Examples:

<details><summary>
In route handler, execute a database query -> non blocking. Why?</summary>
<p>

Database query is I/O tasks, it will be handled in the next 'Poll' phase.

</p>
</details>

<details><summary>
In route handler, execute a long-run for loop in a promise -> blocking. Why?</summary>
<p>

Promise - a microtask is sent to Microtasks queue and must be exhausted before moving to the next phase.

The event loop stucks in this phase, next tick never starts until the operation is done. Therefore, we cannot reach the 'Poll' phase of next tick to handle pending requests.

</p>
</details>