const { Schema } = require('mongoose'); 

const categorySchema = new Schema({
    category: {
        type: String,
        required: true,
    },
},{
    collection: "categories"
});

module.exports = categorySchema;