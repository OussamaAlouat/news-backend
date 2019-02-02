import test from 'tape';
import request from 'supertest';
import {app, server} from '../src/index';

test('-------- Controller: Get /document', (assert) => {
    const url = '/document';
    const message = 'Status must be 200 and response must match with expected document';

    const expectedDodument = {
        archiveDate: null,
        _id: "5c558bd2ae208a3965b13420",
        title: "New DocumentSat Feb 02 2019 13:23:46 GMT+0100 (Central European Standard Time)",
        description: "This is a new test document",
        date: "2019-02-02T12:23:46.946Z",
        content: "The content of this document is a test",
        author: "Oussama Alouat",
        __v: 0
    };

    const payload = {
        id: '5c558bd2ae208a3965b13420'
    };
    const statusCodeExpected = 200;

    request(app)
        .get(url)
        .send(payload)
        .expect(statusCodeExpected)
        .then((response) => {
            const document = response.body.data;
            assert.deepEqual(document, expectedDodument, message);
            assert.end();
            server.close()
        }, (err) => {
            assert.fail(err.message);
            assert.end();
            server.close()
        });

});

test('-------- Controller: Get /document', (assert) => {
    const url = '/document';
    const message = 'Status must be 422 and response must match with expected response';

    const expectedResponse = {
        errors: [
            {
                location: "body",
                param: "id",
                msg: "Invalid value"
            }

        ]
    };

    const statusCodeExpected = 422;

    request(app)
        .get(url)
        .expect(statusCodeExpected)
        .then((response) => {
            const document = response.body;
            assert.deepEqual(document, expectedResponse, message);
            assert.end();
            server.close()
        }, (err) => {
            assert.fail(err.message);
            assert.end();
            server.close()
        });

});

test('-------- Controller: Get /document', (assert) => {
    const url = '/document';
    const message = 'Status must be 200 and response must match with expected document';

    const expectedDodument = [];

    const payload = {
        id: 'theDocumentWillNotBeAtDatabase'
    };
    const statusCodeExpected = 200;

    request(app)
        .get(url)
        .send(payload)
        .expect(statusCodeExpected)
        .then((response) => {
            const document = response.body.data;
            assert.deepEqual(document, expectedDodument, message);
            assert.end();
            server.close()
        }, (err) => {
            assert.fail(err.message);
            assert.end();
            server.close()
        });

});
