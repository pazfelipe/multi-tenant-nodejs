const { Router } = require('express');
const getClientTenantId = require('../middleware/getClientTenantMiddleware');
const ProductSchema = require('../schemas/product');
const UserSchema = require('../schemas/user');

const router = Router();

router.post('/users', async (req, res) => {
  const { name } = req.body;
  const model = new UserSchema();
  await model.save(name);
  const user = await model.findOne({ name });
  res.status(201).send(user);
});

router.post('/products', getClientTenantId, async (req, res) => {
  const { name } = req.body;
  const model = new ProductSchema(req.body.tenant_id);
  await model.save(name);
  res.status(201).send();
});

router.get('/products', getClientTenantId, async (req, res) => {
  const model = new ProductSchema(req.body.tenant_id);
  const products = await model.find();
  res.status(200).send(products);
});

module.exports = router;