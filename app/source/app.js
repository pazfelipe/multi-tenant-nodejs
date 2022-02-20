const express = require('express');
const path = require('path');
const swagger = require('swagger-ui-express');
const http = require('http');
const ConnectToMongoDB = require('./database/mongodb');
const { MSG_WHEN_CONNECTED_TO_THE_MONGO } = require('./variables');
const router = require('./routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.resolve(process.cwd(), 'public')));
app.use('/api-docs',
  swagger.serve,
  swagger.setup(require(path.resolve(process.cwd(), 'swagger-doc.yaml'))));

app.get('/', (req, res) => res.status(200).send('Hello World!'));

new ConnectToMongoDB()
  .connect()
  .then(() => {
    console.log(MSG_WHEN_CONNECTED_TO_THE_MONGO);
  })
  .catch(err => console.log(err));

app.use(router);

module.exports = http.createServer(app);