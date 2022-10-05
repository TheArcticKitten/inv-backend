/**
 * CRUD
 * C - Create (POST)
 * R - Read (GET)
 * U - Update (PUT/PATCH)
 * D - Delete (DELETE)
 */

 const router = require('express').Router();
 const { findAllEntity, findEntityById, createEntity, updateEntity, deleteEntityById } = require('../controllers/entity.controller.js');
 const mongoose = require('mongoose');


// Validate ObjectId middleware
const validateObjectId = (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(204).send(); // Send back the response early
    } else {
        next(); // This calls the standard route for GET/POST/PUT/DELETE with (req, res)
    }
}

// GET ALL ENTITY
// /entity
router.get('/', async (req, res) => {
    const entity = await findAllEntity();
    res.json(entity);
});

// GET ENTITY BY ID
router.get('/:id', validateObjectId, async (req, res) => {
    // req.params.id extracts the id number from the URL
    try {
        const entity = await findEntityById(req.params.id);
        res.json(entity);
    } catch (err) {
        // Rejected Promise AKA no Entity found
        console.log(err);
        res.status(err?.status ?? 500).json(err);
    }
});

// POST http://localhost:9000/entity
// CREATE ENTITY
router.post('/', async (req, res) => {
    try {
        // For POST requests, we send the data through the request body
        const entity = await createEntity(req.body);
        res.status(201).json(entity);
    } catch (err) {
        res.status(err?.status ?? 500).json(err);
    }
});

// UPDATE ENTITY
router.put('/:id', validateObjectId, async (req, res) => {
    try {
        // For PUT requests, the data to update comes through the request body as well
        await updateEntity(req.params.id, req.body);
        res.send();
    } catch (err) {
        res.status(err?.status ?? 500).json(err);
    }
});

// DELETE ENTITY
router.delete('/:id', validateObjectId, async (req, res) => {
    try {
        await deleteEntityById(req.params.id);
        res.send(); // 200 OK is good
    } catch (err) {
        res.status(err?.status ?? 500).json(err);
    }
});

 
 module.exports = router;