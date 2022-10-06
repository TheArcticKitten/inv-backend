const router = require('express').Router();
const { findAllWarehouses, findWarehouseById, createWarehouse, updateWarehouse, deleteWarehouseById } = require('../controllers/warehouse.controller.js');

const validateObjectId = (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(204).send(); // Send back the response early
    } else {
        next(); // This calls the standard route for GET/POST/PUT/DELETE with (req, res)
    }
}

// Find all Warehouses
router.get('/warehouse', async (req, res) => {
    try {
        const warehouses = await findAllWarehouses();
        res.status(200).json(warehouses);
    } catch (err) {
        res.status(500).json(err);
    }
});

// POST http://localhost:8080/warehouse
// CREATE WAREHOUSE
router.post('/', async (req, res) => {
    try {
        const warehouse = await createWarehouse(req.body);
        res.status(201).json(warehouse);
    } catch (err) {
        res.status(err?.status ?? 500).json(err);
    }
})

// UPDATE WAREHOUSE
router.put('/:id', validateObjectId, async (req, res) => {
    try {
        // For PUT requests, the data to update comes through the request body as well
        await updateWarehouse(req.params.id, req.body);
        res.send();
    } catch (err) {
        res.status(err?.status ?? 500).json(err);
    }
});

// DELETE WAREHOUSE
router.delete('/:id', validateObjectId, async (req, res) => {
    try {
        await deleteWarehouseById(req.params.id);
        res.send(); // 200 OK is good
    } catch (err) {
        res.status(err?.status ?? 500).json(err);
    }
});

module.exports = router;