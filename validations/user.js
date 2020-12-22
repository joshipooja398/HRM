const Joi = require('joi');

const APIError = require('../utils/APIError');
const JoiObjectId = require('../utils/joi-objectid')(Joi);

const USER = require('../models/user');

exports.show = {
  params: Joi.object({
    id : JoiObjectId().required(),
  })
};

exports.create = {
  body: Joi.object({
    fullName              : Joi.string().required().max(40).trim(),
    DOB                   : Joi.date().iso(),
    gender                : Joi.string().max(6).required(),
    address               : Joi.string().required(),
    email                 : Joi.string().email().required().trim().lowercase(),
    password              : Joi.string().required().min(8).max(32).trim(),
    contactNo             : Joi.string().length(10).pattern(/^[0-9]+$/).required(),
    emergencyContactNo    : Joi.string().length(10).pattern(/^[0-9]+$/).required(),
    designation           : Joi.string().required(),
    attedanceCode          : Joi.string().required(),
    status                : Joi.string().required(),
    maximumQualification  : Joi.string().required(),
    university            : Joi.string().required(),      
    technology            : Joi.string().required(),       
    vehicalNo             : Joi.string(),      
  })
}

exports.update = {
  params: Joi.object({
    id : JoiObjectId().required(),
  }),
  body: Joi.object({
    fullName              : Joi.string().required().max(40).trim(),
    DOB                   : Joi.date().iso(),
    gender                : Joi.string().max(6).required(),
    address               : Joi.string().required(),
    email                 : Joi.string().email().required().trim().lowercase(),
    password              : Joi.string().required().min(8).max(32).trim(),
    contactNo             : Joi.string().length(10).pattern(/^[0-9]+$/).required(),
    emergencyContactNo    : Joi.string().length(10).pattern(/^[0-9]+$/).required(),
    status                : Joi.string().required(),
    designation           : Joi.string().required(),
    attedanceCode          : Joi.string().required(),
    university            : Joi.string().required(),      
    technology            : Joi.string().required(),       
    vehicalNo             : Joi.string(),
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
    const record = await USER.findOne({_id, isDeleted: false});
    if(!record) throw new APIError({status: 404, message: `No record were found for given id`});    
    if(JSON.stringify(record.user)){
      throw new APIError({status: 403, message: "You don't have sufficient access permission!"});
    }
    next();
  }
  catch(err) {next( err);}
}