'use strict';

const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '/data.json');

const getAllItems = async (request, reply) => {
    fs.readFile(filePath, (err, data) => {
        if(err) throw err;
        reply
        .code(200)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send(JSON.parse(data));
    });
    
};

module.exports = getAllItems;