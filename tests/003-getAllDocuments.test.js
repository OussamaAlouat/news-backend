import test from 'tape';
import request from 'supertest';
import {app, server} from '../src/index';

test('-------- Controller: Get /documents', (assert) => {
    const url = '/documents';
    const message = 'Status must be 200 and response must contains some Documents';


    const statusCodeExpected = 200;

    request(app)
        .get(url)
              .expect(statusCodeExpected)

        .then((response) => {
            const documents = response.body.data;
            assert.equal(documents.length > 0, true, message);
            assert.end();
            server.close()
        }, (err) => {
            assert.fail(err.message);
            assert.end();
            server.close()
        });

});

