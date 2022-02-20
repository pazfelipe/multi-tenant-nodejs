const { default: mongoose } = require('mongoose');
const TenantSchema = require('../schemas/tenants');

const getClientTenantId = async (req, res, next) => {
  const { user_id } = req.body;

  if (!user_id) {
    return res.status(400).send('user_id is required');
  }

  const model = new TenantSchema();
  let tenant = await model.findOne(user_id);

  if (!tenant) {
    await model.save(mongoose.Types.ObjectId(user_id));
  }

  tenant = await model.findOne(user_id);

  req.body.tenant_id = tenant.id;

  next();
};

module.exports = getClientTenantId;