const mongoose = require('mongoose');

const transferSchema = new mongoose.Schema(
  {        
    from_address: {
      type: String,
      required: true
    },       
    to_address: {
      type: String,      
      required: true      
    },       
    value: {
      type: Number,
      required: true
    },      
    value_with_decimals: {
      type: Number,
      required: true      
    }
  },   
  {
    timestamps: true  
  }   
);

transferSchema.index({ from_address: 1, to_address: 1});

const Transfer = mongoose.model('transfer', transferSchema);

module.exports = {
  transferSchema,  
  Transfer   
}