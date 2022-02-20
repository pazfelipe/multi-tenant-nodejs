const { Schema } = require('mongoose');
const ConnectToMongoDB = require('../database/mongodb');

const schema = new Schema({
  name: {
    type: String,
    required: true,
  }
}, {
  timestamps: true
});

class UserSchema {

  constructor() {
    this.create();
  }
  create() {
    return new Promise(resolve => {
      new ConnectToMongoDB()
        .connect()
        .then(client => {
          resolve(client.model('User', schema));
        });
    });
  }

  async save(name) {
    const client = await this.create();
    await client.create({ name });
  }
  async findOne(query) {
    const client = await this.create();
    return await client.findOne(query);
  }
}

module.exports = UserSchema;


