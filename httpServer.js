'use strict';

var http = require('http'),
    time = require('time'),
    route = {
        'time': function () {
            return new time.Date().toString();
        },
        'greet': function (name) {
            return 'hello ' + name;
        }
    };

http.createServer(function (req, res) {
    var regex = /^\/(\w+)\/?(\w+)?/g,
        path = regex.exec(req.url).slice(1),
        router = route[path[0]];
    res.writeHead(200, {'Content-Type': 'text/plain'});

    if (typeof router === 'function') {
        if (!path[1]) { // if path is "/time"
            res.end(router());
        } else { // if path is "/greet/someName"
            res.end(router(path[1]));
        }
    } else { // if path is "/someThingElse"
        res.end('Opps, there is no route to your path');
    }
}).listen(3000);

