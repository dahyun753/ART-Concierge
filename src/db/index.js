const mongoose = require('mongoose');
const userSchema = require('../db/schemas/userSchema');
const orderSchema = require('../db/schemas/orderSchema');
const exhibitSchema = require('../db/schemas/exhibitSchema');
const categorySchema = require('../db/schemas/categorySchema');

exports.User = mongoose.model('User', userSchema);
exports.Order = mongoose.model('Order', orderSchema);
exports.Exhibit = mongoose.model('Exhibit', exhibitSchema);
exports.Category = mongoose.model('Category', categorySchema);
