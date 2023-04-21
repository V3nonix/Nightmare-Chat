require('dotenv').config();
require('./config/database');
const Global = require('./models/global');

(async function() {

    const global = await Global.create({ messages: [] });

    // const global = await Global.findById('6441f4d4ef2bbdf9f1db43d5');

    console.log(global);

    process.exit();

})();

