const { Schema } = require('mongoose'); 
const shortId = require('./types/short-id');

const categorySchema = new Schema({
    categoryId: shortId,
    
    category: {
        type: String,
        required: true,
    },
},{
    collection: "categories"
});

module.exports = categorySchema;