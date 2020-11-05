'use strict';

const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '../data/data.json');

const postItem = async (request, reply) => {
    const body = request.body;
    if(body) {
        if(!body.category) {
            return reply
            .code(400)
            .header('Content-Type', 'application/json; charset=utf-8')
            .send({ error: 'The category is missing' }) 
        }

        body.id = crypto.randomBytes(10).toString('base64');
        body.publishedDate = Date.now();
        fs.readFile(filePath, (err, data) => {
            const dataItems = JSON.parse(data);
           
            dataItems.push(body);
            fs.writeFile(filePath, JSON.stringify(dataItems, null, 4), (err) => {
                if (err) throw err;
            });
        });
        return reply
        .code(200)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send({ success: 'data is sent' })
    } else {
        return reply
        .code(400)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send({ 
            message: 'The payload is missing',
            status: 400
        });
    }
}

module.exports = postItem;