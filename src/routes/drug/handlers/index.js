const createError = require('http-errors');
const Drug = require('../../../db/drug');

module.exports = {
  drugPOST,
  drugsGET
};

async function drugPOST (req, res, next) {
  try {
    const { body } = req;
    const drug = await new Drug(body).save();
    res.send(drug);
  } catch (error) {
    next(createError(400, error));
  }
}

async function drugsGET (req, res, next) {
  try {
    const drugs = await Drug.find({});
    res.send(drugs);
  } catch (error) {
    next(error);
  }
}