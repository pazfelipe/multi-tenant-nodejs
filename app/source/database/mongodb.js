const mongoose = require('mongoose');
const configs = require('../configs');

class ConnectToMongoDB {
  constructor(dbName = configs.DB.DB_NAME) {
    this.dbName = dbName;
    this.dbURL = `${configs.DB.DB_URL}/${dbName}`;
  }

  connect() {
    return new Promise((resolve, reject) => {
      // mongoose.connection.close();
      mongoose.createConnection(this.dbURL,
        {
          useNewUrlParser: true,
          maxPoolSize: 100
        },
        (err, client) => {
          if (err) {
            reject(err);
          }
          resolve(client);
        });
    });
  }
}

module.exports = ConnectToMongoDB;