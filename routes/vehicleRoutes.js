const express = require('express');
const vehicleController = require('../controllers/vehicleController');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Vehicles
 *   description: Vehicle management
 */

/**
 * @swagger
 * /api/v1/vehicles/available-for-request/{requestId}:
 *   get:
 *     summary: Get available vehicles for a specific request
 *     tags: [Vehicles]
 *     parameters:
 *       - in: path
 *         name: requestId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 */
router.get('/available-for-request/:requestId', vehicleController.getAvailableVehiclesForRequest);

/**
 * @swagger
 * /api/v1/vehicles:
 *   get:
 *     summary: Get all vehicles
 *     tags: [Vehicles]
 *     responses:
 *       200:
 *         description: Success
 *   post:
 *     summary: Create a new vehicle
 *     tags: [Vehicles]
 *     responses:
 *       201:
 *         description: Created
 */
router.route('/')
    .get(vehicleController.getAllVehicles)
    .post(vehicleController.createVehicle);

/**
 * @swagger
 * /api/v1/vehicles/{id}:
 *   get:
 *     summary: Get a vehicle by ID
 *     tags: [Vehicles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *   put:
 *     summary: Update a vehicle
 *     tags: [Vehicles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Updated
 *   delete:
 *     summary: Delete a vehicle
 *     tags: [Vehicles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Deleted
 */
router.route('/:id')
    .get(vehicleController.getVehicle)
    .put(vehicleController.updateVehicle)
    .delete(vehicleController.deleteVehicle);

module.exports = router;
