const createError = require('http-errors');
const DrugAction = require('../../../db/drugAction');
const Drug = require('../../../db/drug');

module.exports = {
  drugActionPOST,
  drugActionGET,
  usersOrdersGET,
  revertDrugAction
};

async function drugActionPOST (req, res, next) {
  try {
    const { body } = req;
    const { actions, type } = body;
    if (type === 'decrease-amount' || type === 'order') {
      const filters = actions.map(action => {return {_id: action.drug}});
      const drugs = await Drug.find({$or: filters});
      let errors = [];
      actions.forEach((action) => {
        const drug = drugs.find(drug => drug._id = action.drug);
        if (drug.amount - action.amount < 0) {
          errors.push({drug, error: 'Not enough drugs in store', requestAmount: action.amount});
        }
      });
      if (errors.length) {
        return res.status(400).send(errors);
      }
      for (let action of actions) {
        await Drug.update({_id: action.drug}, {$inc: {amount: -(action.amount)}});
      }
    } else {
      for (let action of actions) {
        await Drug.update({_id: action.drug}, {$inc: {amount: action.amount}});
      }
    }
    const drugAction = await new DrugAction(body).save();
    res.send(drugAction);
  } catch (error) {
    next(createError(400, error));
  }
}

async function drugActionGET (req, res, next) {
  try {
    const drugActions = await DrugAction.find({})
      .populate({path: 'user', select: 'email'})
      .populate('actions.drug')
      .sort({createdAt: -1});
    res.send(drugActions);
  } catch (error) {
    next(error);
  }
}

async function usersOrdersGET(req, res, next) {
  try {
    const orders = await DrugAction.find({type: 'order'})
      .populate({path: 'user', select: 'email'})
      .populate('actions.drug')
      .sort({createdAt: -1});
    res.send(orders);
  } catch (error) {
    next(error);
  }
}

async function revertDrugAction(req, res, next) {
  try {
    const { id } = req.params;
    const drugAction = await DrugAction.findOne({_id: id});
    if (!drugAction) {

      res.status(400).send({message: 'drug action does not exist', status: 400});
    }
    const {type, actions} = drugAction;
    if (type === 'decrease-amount' || type === 'order') {
      for (let action of actions) {
        await Drug.update({_id: action.drug}, {$inc: {amount: action.amount}});
      }
    } else {
      for (let action of actions) {
        await Drug.update({_id: action.drug}, {$inc: {amount: -(action.amount)}});
      }
    }
    drugAction.remove();
    res.send({message: `Removed item ${id}`});
  } catch (error) {
    next(error);
  }
}
