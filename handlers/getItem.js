'use strict';

const _ = require('lodash');
const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '../data/data.json');

const getItem = async (request, reply) => {
    const itemId = _.get(request, 'params.item', '');
    if(!itemId) {
        reply
            .code(400)
            .header('Content-Type', 'application/json; charset=utf-8')
            .send({ error: 'The item Id is missing' }) 
    }
    fs.readFile(filePath, (err, data) => {
        if(err) throw err;
        const dataItems = JSON.parse(data);
        const dataItem = _.find(dataItems, (item) => {
            return item.id === itemId;
        });

        if(dataItem) {
            reply
            .code(200)
            .header('Content-Type', 'application/json; charset=utf-8')
            .send(dataItem)
        } else {
            reply
            .code(404)
            .header('Content-Type', 'application/json; charset=utf-8')
            .send('item not found')
        }
    });

}

module.exports = getItem;