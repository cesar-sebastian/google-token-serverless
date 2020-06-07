'use strict';

const { GoogleToken } = require('gtoken');

module.exports.token = async (event, context, callback) => {

    const data = JSON.parse(event.body);

    if (typeof data.email !== 'string') {
        console.error('Validation Failed');
        callback(null, {
            statusCode: 400,
            headers: { 'Content-Type': 'text/plain' },
            body: 'Couldn\'t get token, email is null.',
        });
        return;
    }

    if (typeof data.privateKey !== 'string') {
        console.error('Validation Failed');
        callback(null, {
            statusCode: 400,
            headers: { 'Content-Type': 'text/plain' },
            body: 'Couldn\'t get token, privateKey is null.',
        });
        return;
    }

    const gtoken = new GoogleToken({
        email: data.email,
        scope: ['https://www.googleapis.com/auth/devstorage.read_write'],
        key: data.privateKey
    });

    const response = {
        statusCode: 200,
        body: JSON.stringify({
            message: 'Your function executed successfully!',
            access_token: await gtoken.getToken()
        }),
    };

    callback(null, response);
};



