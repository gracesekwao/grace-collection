'use strict';
const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '/data.json');

const postItem = async (request, reply) => {
    const body = request.body;
    if(body) {
        body.publishedDate = Date.now();
        fs.readFile(filePath, (err, data) => {
            const dataItems = JSON.parse(data);
            dataItems.push(body);
            fs.writeFile(filePath, JSON.stringify(dataItems, null, 4), (err) => {
                if (err) throw err;
            });
        });
        reply
        .code(200)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send({ success: 'data is sent' })
    } else {
        reply
        .code(400)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send({ error: 'The payload is missing' })
    }
}

module.exports = postItem;