require('dotenv').config();
const app = require('../source/app');
const configs = require('../source/configs');
const { INITIAL_MESSAGE_ON_STARTUP_SERVER } = require('../source/variables');

const { PORT } = configs;

app.listen(process.env.PORT, () => {
  console.log(INITIAL_MESSAGE_ON_STARTUP_SERVER(PORT));
});