'use strict';

const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '../data/data.json');

const getCategories = async (request, reply) => {
    const categories = [];
    fs.readFile(filePath, (err, data) => {
        if(err) throw err;
        const dataItems = JSON.parse(data);
        dataItems.map(item => {
            if(!categories.includes(item.category)){
                categories.push(item.category)
            }
        });
        reply
        .code(200)
        .send(categories);
    });
};

module.exports = getCategories;