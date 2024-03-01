const mongoose = require('mongoose');
const userSchema = require('./schemas/user-schema');
const orderSchema = require('./schemas/order-schema');
const exhibitSchema = require('./schemas/exhibit-schema');
const categorySchema = require('./schemas/category-schema');
const validationSchema = require('./schemas/validation-schema');

exports.User = mongoose.model('User', userSchema);
exports.Order = mongoose.model('Order', orderSchema);
exports.Exhibit = mongoose.model('Exhibit', exhibitSchema);
exports.Category = mongoose.model('Category', categorySchema);
exports.ValidPsw = mongoose.model('ValidPsw', validationSchema);
