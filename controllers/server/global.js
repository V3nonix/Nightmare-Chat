// Requires Mongoose Model(s):
const Global = require('../../models/global');

async function fetchGlobal() {
    // Retrieves global:
    const global = await Global.findById('6441f4d4ef2bbdf9f1db43d5');
    console.log(global);
    return global;
}

async function msgGlobal(msg, global) {
    if (global.messages.length === 300) global.messages.pop();
    global.messages.push(msg);
    if (Global.validate(global)) return global;
}

async function saveGlobal(global) {
    if (Global.validate(global)) await Global.save(global);
}

// Exports module methods:
module.exports = {
    fetchGlobal,
    msgGlobal,
    saveGlobal
};