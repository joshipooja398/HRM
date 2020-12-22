const APIError = require('../utils/APIError');
const { toObject, generateJwt, removeFields } = require('../utils/helper');

const USER = require('../models/user');
const DOCUMENT = require('../models/document');

/**
 * Get all DOCUMENT
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.all = async (req, res, next) => {
  try {
    const documents = await DOCUMENT.find({isDeleted: false}, '-__v -isDeleted -createdAt -updatedAt -deletedAt -deletedBy')
      .populate({path: 'user', select: 'fullName'});
    return res.sendJson(200, documents);
  } catch (error) { next(error); }
}

/**
 * Get Document by given id
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.show = async (req, res, next) => {
  try {
    const _id = req.params.id;
    const document = await DOCUMENT.findOne({_id, isDeleted: false})
      .populate({path: 'user', select: 'fullName'});
    return res.sendJson(200, removeFields(document.toObject()));
  } catch (error) { next(error); }
}

/**
 * Create new Document
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.store = async (req, res, next) => {
  try {
    const payload = req.body;
    const user = await USER.findOne({name: new RegExp('user', 'i')}, '_id');
    if(!USER) throw new APIError({message: 'It seems that the system has no user.'});
    payload.user = req.user._id;
    const document = await DOCUMENT.create(payload);
    res.send(document);
    return res.sendJson(200, removeFields(document.toObject(), []));
  } catch (error) { next(error); }
}

/**
 * Update Document by given id
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.update = async (req, res, next) => {
  try {
    const _id = req.params.id;
    const payload = req.body;
    const _query = {_id, isDeleted: false};
    const document = await DOCUMENT.findOneAndUpdate(_query, {$set: payload}, {new: true});
    return res.sendJson(200, removeFields(document.toObject(), []));
  } catch (error) { next(error); }
}

/**
 * Delete Document by given id
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.destroy = async (req, res, next) => {
  try {
    const _id = req.params.id;
    const _query = {_id, isDeleted: false};
    const _delete = {$set: {isDeleted: true}};
    await DOCUMENT.findOneAndUpdate(_query, _delete);
    return res.sendJson(200, "Document deleted successfully");
  } catch (error) { next(error); }
}