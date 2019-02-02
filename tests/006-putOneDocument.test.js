import test from 'tape';
import request from 'supertest';
import {app, server} from '../src/index';

test('-------- Controller: PUT /document', (assert) => {

    const getUrl = '/documents';
    const putUrl = '/document';
    const message = 'Status must be 200 and response must match with the expected simple message';

    const responseExpected = {
        message: "Document updated"
    };

    const statusCodeExpected = 200;

    request(app)
        .get(getUrl)
        .expect(statusCodeExpected)
        .then((response) => {
                const documents = response.body.data;
                const documentToUpdate = documents[documents.length - 1];
                const payload = {
                    id: documentToUpdate._id,
                    title: 'Edited on: ' + new Date().getDay(),
                    description: 'This is a new test document',
                    content: 'The content of this document is a test',
                    author: 'Oussama Alouat',
                    archiveDate: new Date()
                };

                request(app)
                    .put(putUrl)
                    .send(payload)
                    .expect(statusCodeExpected)
                    .then((result) => {
                        assert.deepEqual(result.body,responseExpected,message)

                    }, (err) => {
                        assert.fail(err.message);
                        assert.end();
                        server.close()
                    });
            }, (err) => {
                assert.fail(err.message);
                assert.end();
                server.close()
            }
        );
});