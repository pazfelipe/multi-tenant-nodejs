const { Schema } = require('mongoose');
const ConnectToMongoDB = require('../database/mongodb');

const schema = new Schema({
  name: {
    type: String,
    required: true,
  }
});

class ProductSchema {

  constructor(dbName = undefined) {
    this.create();
    this.dbName = dbName;
  }
  create() {
    return new Promise(resolve => {
      new ConnectToMongoDB(this.dbName)
        .connect()
        .then(client => {
          resolve(client.model('Product', schema));
        });
    });
  }

  async save(name) {
    const client = await this.create();
    await client.create({ name });
  }
  async findOne(id) {
    const client = await this.create();
    return await client.findOne({ _id: id });
  }

  async find() {
    const client = await this.create();
    return await client.find();
  }
}

module.exports = ProductSchema;


