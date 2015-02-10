'use strict';
require('../httpServer');
var chai = require('chai'),
    time = require('time'),
    chaihttp = require('chai-http'),
    expect = chai.expect;
chai.use(chaihttp);

describe('basic http server test', function () {
    function assertStatusOK(err, res) {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
    }

    it('should respond to a request to "/time"', function (done) {
        chai.request('localhost:3000')
            .get('/time')
            .end(function (err, res) {
                assertStatusOK(err, res);
                expect(res.text).to.eql(new time.Date().toString());
                done();
            });
    });

    it('should greet a name to a request "/greet/someName"', function (done) {
        chai.request('localhost:3000')
            .get('/greet/zhihong')
            .end(function (err, res) {
                assertStatusOK(err, res);
                expect(res.text).to.eql("hello zhihong");
                done();
            });

    });


});

