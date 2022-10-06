const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * What properties does the Warehouse have?
 * 
 * warehouseId
 * name
 * storageCapacity
 * location (city, state)
 */
const warehouseSchema = new Schema({
    warehouseId: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    storageCapacity: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    }
    
});

const Warehouse = mongoose.model('Warehouse', warehouseSchema, 'Warehouse');
module.exports = Warehouse;
