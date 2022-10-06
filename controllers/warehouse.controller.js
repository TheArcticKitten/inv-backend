const Warehouse = require('../models/Warehouse.model.js');

// populate will automatically lookup the referred documents so long as there's a ref property
// const findAllWarehouses = async () => await Warehouse.find().populate('team');

const findAllWarehouses = async () => await Warehouse.find(); // This returns all Warehouses

const findWarehouseById = async id => {
    try {
        const warehouse = await Warehouse.findById(id);
        if (warehouse == null) {
            throw {status: 204, msg: `No Warehouse with the id ${id} was found.`};
        }
        return warehouse; // This returns the warehouse if we found it
    } catch (err) {
        // warehouse was not found
        throw err; // Rethrow to have a rejected promise
    }
};

const createWarehouse = async warehouseToSave => {
    try {
        const warehouse = new Warehouse(warehouseToSave);
        await warehouse.save();
        return warehouse;
    } catch (err) {
        throw { status: 500, msg: err.message };
    }
};

const updateWarehouse = async (id, warehouseToUpdate) => {
    try {
        await Warehouse.findByIdAndUpdate(id, warehouseToUpdate);
    } catch (err) {
        throw { status: 400, msg: err };
    }
};

const deleteWarehouseById = async id => await Warehouse.findByIdAndDelete(id);

module.exports = { findAllWarehouses, findWarehouseById, createWarehouse, updateWarehouse, deleteWarehouseById };