'use strict';

const EventEmitter = require('events').EventEmitter;
const LDJClient = require('../lib/ldj-client.js');

describe('LDJClient', () => {
    let stream = null;
    let client = null;

    beforeEach(() => {
        stream = new EventEmitter();
        client = new LDJClient(stream);
    });

    test('should emit a message event from a single data event', done => {
        client.on('message', message => {
            expect(message).toEqual({ foo: 'bar' });
            done();
        });
        stream.emit('data', '{"foo":"bar"}\n');
    });

    test('should emit a message event from split data events', done =>{
        client.on('message', message => {
            expect(message).toEqual({ foo: 'bar' });
            done();
        });
        stream.emit('data', '{"foo":');
        process.nextTick(() => stream.emit('data', '"bar"}\n'));
    })
});
