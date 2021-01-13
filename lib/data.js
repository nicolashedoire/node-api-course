/*
* Library for storing and editing data
*
*/

// Dependencies
const { promises: fs } = require("fs");
const path = require('path');

let lib = {};

lib.basedir = path.join(__dirname, '../.data/');

lib.create = async function({dir, file, data}, callback) {
    // Create directory if not exist
    await fs.mkdir(`${lib.basedir}${dir}`).catch(e => console.log(e));
    // Create file
    let fileDescriptor = await fs.open(`${lib.basedir}${dir}/${file}.json`, 'w+').catch((e) => console.error(e));
    // Write in file
    await fs.writeFile(fileDescriptor, JSON.stringify(data)).catch(e => console.error(e));
    // Close fileDescriptor
    await fileDescriptor.close().catch(e => console.error(e));
    // Send response
    callback('Document created');
};

lib.read = async function({dir, file}, callback) {
    const fileContent = await fs.readFile(`${lib.basedir}${dir}/${file}.json`, 'utf8').catch(e => console.log(e));
    callback(fileContent);
};

lib.update = async function({dir, file, data}, callback) {
    // Open the file
    let fileDescriptor = await fs.open(`${lib.basedir}${dir}/${file}.json`, 'r+').catch((e) => console.error(e));
    // Write in file
    await fs.writeFile(fileDescriptor, JSON.stringify(data)).catch(e => console.error(e));
    // Close fileDescriptor
    await fileDescriptor.close().catch(e => console.error(e));
    // Send response
    callback('Document updated');
};

lib.delete = async function({dir, file}, callback) {
    let errors = null;
    await fs.unlink(`${lib.basedir}${dir}/${file}.json`).catch(e => errors = e);
    callback(errors ? errors : 'Document deleted');
};

module.exports = lib;