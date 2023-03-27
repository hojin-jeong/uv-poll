# @mapside/uv-poll
It's UV_POLL_T for nodejs

It's an event emitter wrapper for [libuv's UV_POLL_T struct](http://docs.libuv.org/en/v1.x/poll.html).

```js
const fd = fs.openSync('file')
const poll = new Poller(fd)
poll.on('readable', () => console.log(`fd ${fd} is now readable`))
poll.on('writable', () => console.log(`fd ${fd} is now writable`))
poll.on('disconnect', () => console.log(`fd ${fd} is now disconnect`)) // means not readable or writable
```

forked from [reconbot/uv-poll](https://github.com/reconbot/uv-poll)