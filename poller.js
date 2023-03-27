'use strict';

const Debug         = require('debug')('@map_side/uv-poll')
const EventEmitter  = require('events')
const PollerBinding = require('bindings')('poller.node').Poller

/**
 * Polls unix systems for readable or writable states of a file or serialport
 */
module.exports = class Poller extends EventEmitter {
  static EVENTS = {
    UV_READABLE: 1,
    UV_WRITABLE: 2,
    UV_DISCONNECT: 4
  }

  constructor(fd) {
    Debug('Creating poller')
    super()

    this.poller = new PollerBinding(fd, this.$_handleEvent.bind(this))
    this.poller.start()

    Debug('Poller started')
  }

  $_handleEvent(err, flag) {
    if (err) {
      Debug('error', err)
      return this.emit('error', err)
    }
    if (flag & Poller.EVENTS.UV_READABLE) {
      Debug('received "readable"')
      this.emit('readable', null)
    }
    if (flag & Poller.EVENTS.UV_WRITABLE) {
      Debug('received "writable"')
      this.emit('writable', null)
    }
    if (flag & Poller.EVENTS.UV_DISCONNECT) {
      Debug('received "disconnect"')
      this.emit('disconnect', null)
    }
  }

  stop() {
    Debug('Stopping poller')
    this.poller.stop()
    this.emitCanceled()
  }

  emitCanceled() {
    const err = new Error('Canceled')
    err.canceled = true
    this.emit('readable', err)
    this.emit('writable', err)
    this.emit('disconnect', err)
  }
};
