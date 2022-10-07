/**
 * Mongoose is a wrapper around the native MongoDB driver for Nodejs
 * It abstracts some of the lower level queries and adds some new functionality
 * 
 * Mongoose enforces a schema to MongoDB documents
 * MongoDB is schemaless, but Mongoose adds a schema to it
 * 
 * The reason we do this is simply to restrict what's allowed to be submitted
 */

// This file will be our data model for a Entity document

const mongoose = require('mongoose');
const Schema = mongoose.Schema; // Schema is a class that we can create our DB schemas with

/**
 * What properties do our Entity have?
 * 
 * entityId
 * warehouseId
 * entityName
 * entitySize
 */
const entitySchema = new Schema({
    // Mongoose gives you a _id if you don't specify one
    // Inside here, I will define my document schema
    entityCount: Number,
    entityDesc: String,
    entityId: Number,
    entityName: String,
    entitySize: Number,
    imageUrl: String,
    warehouseId: Number,
    __v: Number,
    _id: String,
});

// Now take the schema and transform into a model
//                              Name         Schema      What I actually want it called in MongoDB
const Entity = mongoose.model('Entity', entitySchema, 'Entity');

// This Entity model we will use to construct queries for this collection
module.exports = Entity;