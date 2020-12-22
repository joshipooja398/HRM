const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const DocumentSchema = new Schema({
    
    offerLetter          : { type: Boolean },
    appoinmentLetter     : { type: Boolean },
    docDate              : { type: Date },
    markSheet10th        : { type: Boolean },
    markSheet12thDeploma : { type: String },
    bachelorCerti        : { type: String },
    masterDegreeMsheet   : { type: String },
    idProof              : { type: Boolean },
    photo                : { type: String },
    user                 : { type: ObjectId, ref:'user', default: null },
    isDeleted            : { type: Boolean, default: false },
  },
{
  timestamps: true,
});

module.exports = mongoose.model('document', DocumentSchema, 'documents');
