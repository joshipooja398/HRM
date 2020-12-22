const Joi = require('joi');
const APIError = require('../utils/APIError');
const JoiObjectId = require('../utils/joi-objectid')(Joi);

const DOCUMENT = require('../models/document');

exports.show = {
  params: Joi.object({
    id : JoiObjectId().required(),
  })
};

exports.create = {
  body : Joi.object({
    offerLetter         : Joi.boolean().required(),
    appoinmentLetter    : Joi.boolean().required(),
    docDate             : Joi.date().iso(),
    marksheet10th       : Joi.boolean().required(),
    marksheet12thDeploma: Joi.string().required(),
    bachelorCerti       : Joi.string().required(),
    masterDegreeMsheet  : Joi.string().required(),
    idProof             : Joi.boolean().required(),
    photo               : Joi.boolean().required()
  })
}

exports.update = {
  params: Joi.object({
    id : JoiObjectId().required(),
  }),
  body: Joi.object({
   offerLetter           : Joi.boolean().required(),
    appoinmentLetter      : Joi.boolean().required(),
    docDate               : Joi.date().iso(),
    marksheet10th         : Joi.boolean().required(),
    marksheet12thDeploma  : Joi.string().required(),
    bachelorCerti         : Joi.string().required(),
    masterDegreeMsheet    : Joi.string().required(),
    idProof               : Joi.boolean().required(),
    photo                 : Joi.boolean().required()
  }).required().not({})
}

exports.destroy = {
  params: Joi.object({
    id : JoiObjectId().required(),
  })
};

exports.isExists = async (req, res, next) => {
  try {
    const _id = req.params.id;
    const payroll = req.payroll;
    const record = await DOCUMENT.findOne({_id, isDeleted: false});
    if(!record) throw new APIError({status: 404, message: `No record were found for given id`});    
    if(JSON.stringify(record.payroll)){
      throw new APIError({status: 403, message: "You don't have sufficient access permission!"});
    }
    next();
  }
  catch(err) {next( err);}
}