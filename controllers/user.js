const passport = require('passport');
const APIError = require('../utils/APIError');
const { toObject, generateJwt, removeFields } = require('../utils/helper');

const USER = require('../models/user');
const ROLE = require('../models/role');

/**
 * Get all USER
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.all = async (req, res, next) => {
    try {
      const users = await USER.find({isDeleted: false}, '-__v -isDeleted -createdAt -updatedAt -deletedAt -deletedBy');
      return res.sendJson(200, users);
    } catch (error) { next(error); }
  }
  
/**
 * Get USER by given id
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.show = async (req, res, next) => {
  try {
    const _id = req.params.id;
    const user = await USER.findOne({_id, isDeleted: false});
    return res.sendJson(200, removeFields(user.toObject()));
  } catch (error) { next(error); }
}

/**
 * Update USER by given id
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.update = async (req, res, next) => {
  try {
    const _id = req.params.id;
    const payload = req.body;
    const _query = {_id, isDeleted: false};
    const user = await USER.findOneAndUpdate(_query, {$set: payload}, {new: true});
    return res.sendJson(200, removeFields(user.toObject(), []));
  } catch (error) { next(error); }
}
  
/**
 * Delete USER by given id
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.destroy = async (req, res, next) => {
  try {
    const _id = req.params.id;
    const _query = {_id, isDeleted: false};
    const _delete = {$set: {isDeleted: true}};
    await USER.findOneAndUpdate(_query, _delete);
    return res.sendJson(200, "User deleted successfully");
  } catch (error) { next(error); }
}