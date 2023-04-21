// Requires Mongoose Model(s):
const Global = require('../../models/global');

async function fetchGlobal() {
    // Retrieves global:
    const global = await Global.find({});
    return global[0];
}

async function msgGlobal(msg) {
    const global = await fetchGlobal();
    if (global.messages.length === 300) global.messages.pop();
    global.messages.push(msg);
    await global.save();
    return global;
}

async function saveGlobal(global) {
    await global.save();
    return true;
}

// Exports module methods:
module.exports = {
    fetchGlobal,
    msgGlobal,
    saveGlobal,
};