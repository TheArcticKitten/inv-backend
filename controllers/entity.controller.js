// Make all queries in this file
const Entity = require('../models/Entity.model.js'); // Import the Entity model

// Find all Entity
const findAllEntity = async () => await Entity.find(); // This returns all Entity

const findEntityById = async id => {
    try {
        // You might think not finding it returns a rejected Promise
        const entity = await Entity.findById(id);
        // If it doesn't find anything, it returns null
        if (entity == null) {
            throw {status: 204, msg: `No Entity with the id ${id} was found.`};
        }
        return entity; // This returns the entity if we found it
    } catch (err) {
        // Entity was not found
        throw err; // Rethrow to have a rejected promise
    }
};

const createEntity = async entityToSave => {
    try {
        // We'll use the model and create a new instance of it
        // This alone does not save the entity
        const entity = new Entity(entityToSave); // This runs all of my validation logic
        await entity.save(); // Take the instance and save it
        return entity;
    } catch (err) {
        throw err;
    }
}

const updateEntity = async (id, entityToUpdate) => {
    try {
        await Entity.findByIdAndUpdate(id, entityToUpdate);
    } catch (err) {
        throw { status: 400, msg: err };
    }
};

const deleteEntityById = async id => await Entity.findByIdAndDelete(id);

module.exports = { findAllEntity, findEntityById, createEntity, updateEntity, deleteEntityById };