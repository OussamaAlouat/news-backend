import test from 'tape';
import request from 'supertest';
import {app, server} from '../src/index';

test('-------- Controller: Post /document', (assert) => {
    const url = '/document';
    const message = 'Status must be 201 and response must match with the expected simple message';
    const responseExpected = {
        message: "Document created correctly"
    };

    const payload = {
        title: 'New Document' + new Date() ,
        description: 'This is a new test document',
        date: new Date(),
        content: 'The content of this document is a test',
        author: 'Oussama Alouat',
        archiveDate: null
    };

    const statusCodeExpected = 201;
    request(app)
        .post(url)
        .send(payload)
        .expect(statusCodeExpected)
        .then(
            (res) => {
                assert.deepEqual(res.body, responseExpected, message);
                assert.end();
                server.close()
            }, (err) => {
                assert.fail(err.message);
                assert.end();
                server.close()
            }
        );
});


test('-------- Controller: Post /document', (assert) => {
    const url = '/document';
    const message = 'Status must be 409 and response must match with the expected simple message. ' +
        'Because this Document is already at the database';
    const responseExpected = {
        message: "This document already exists on database"
    };


    const title = 'New Document' + new Date();

    const payload = {
        title: title,
        description: 'This is a new test document',
        date: new Date(),
        content: 'The content of this document is a test',
        author: 'Oussama Alouat',
        archiveDate: null
    };
    const statusCodeExpected = 409;
    request(app)
        .post(url)
        .send(payload)
        .expect(statusCodeExpected)
        .then(
            (res) => {
                request(app)
                    .post(url)
                    .send(payload)
                    .then(
                        (response) => {
                            assert.deepEqual(response.body, responseExpected, message);
                            assert.end();
                            server.close()
                        } ,(err) => {
                            assert.fail(err.message);
                            assert.end();
                            server.close()
                        }
                    );

            }, (err) => {
                assert.fail(err.message);
                assert.end();
                server.close()
            }
        );
});

test('-------- Controller: Post /document', (assert) => {
    const url = '/document';
    const message = 'Status must be 422 and response must match with the expected simple message. ' +
        'Because this Document is already at the database';
    const responseExpected = {
        "errors": [
            {
                "location": "body",
                "param": "archiveDate",
                "msg": "Invalid value"
            }
        ]
    };



    const payload = {
        title: 'New Document' + new Date() ,
        description: 'This is a new test document',
        date: new Date(),
        content: 'The content of this document is a test',
        author: 'Oussama Alouat'
    };

    const statusCodeExpected = 422;
    request(app)
        .post(url)
        .send(payload)
        .expect(statusCodeExpected)
        .then(
            (res) => {
                assert.deepEqual(res.body, responseExpected, message);
                assert.end();
                server.close()
            }, (err) => {
                assert.fail(err.message);
                assert.end();
                server.close()
            }
        );
});