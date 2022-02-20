const { default: mongoose } = require('mongoose');
const { Schema } = require('mongoose');
const ConnectToMongoDB = require('../database/mongodb');

const schema = new Schema({
  user_id: {
    type: mongoose.Types.ObjectId,
    required: true,
  }
}, {
  timestamps: true
});

class TenantSchema {

  constructor() {
    this.create();
  }
  create() {
    return new Promise(resolve => {
      new ConnectToMongoDB()
        .connect()
        .then(client => {
          resolve(client.model('Tenants', schema));
        });
    });
  }

  async save(user_id) {
    const client = await this.create();
    await client.create({ user_id });
  }
  async findOne(user_id) {
    const client = await this.create();
    return await client.findOne({ user_id });
  }
}

module.exports = TenantSchema;


