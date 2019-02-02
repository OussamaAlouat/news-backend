import test from 'tape';
import request from 'supertest';
import {app, server} from '../src/index';

test('-------- Controller: Delete /document', (assert) => {
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
        .delete(url)
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
