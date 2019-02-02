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


test('-------- Controller: Delete /document', (assert) => {
    const getUrl = '/documents';
    const message = 'Status must be 200 and response must contains the id of deleted document';
    const deleteUrl = '/document';

    const statusCodeExpected = 200;

    request(app)
        .get(getUrl)
        .expect(statusCodeExpected)
        .then((response) => {
            const documents = response.body.data;
            const documentToDelete = documents[documents.length - 1];

            const payload = {
                id: documentToDelete._id
            };

            const expectedResponse = {
                message: "Document was delete",
                document_id: payload.id
            };

            request(app)
                .delete(deleteUrl)
                .send(payload)
                .expect(statusCodeExpected)
                .then((result) => {
                    assert.deepEqual(result.body.response, expectedResponse, message);
                    assert.end();
                    server.close()
                }, (err) => {
                    assert.fail(err.message);
                    assert.end();
                    server.close()
                });
            server.close()
        }, (err) => {
            assert.fail(err.message);
            assert.end();
            server.close()
        });

});
