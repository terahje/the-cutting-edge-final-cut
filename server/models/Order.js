const mongoose = require('mongoose');

const { Schema } = mongoose;

const orderSchema = new Schema({
  purchaseDate: {
    type: Date,
    default: Date.now
  },
  styles: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Style'
    }
  ]
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
