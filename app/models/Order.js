'use strict'
/**
 * Module Dependencies
 */

// snake case used
const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

let order_schema = new Schema({
    order_Id: {
        type: String,
        index: true,
        // unique: true
      },
      item_name: {
        type: String,
       
      },
      cost: {
        type: Number,
       
      },
      order_date: {
        // type: Date,
        type: String,
       
      },
      delivery_date: {
        // type: Date,
        type: String,
       
      },
})
mongoose.model('Order', order_schema);