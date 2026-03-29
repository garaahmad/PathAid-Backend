const express = require('express');
const transportRequestController = require('../controllers/transportRequestController');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: TransportRequests
 *   description: Transport request management
 */

/**
 * @swagger
 * /api/v1/transportrequests:
 *   get:
 *     summary: Get all transport requests
 *     tags: [TransportRequests]
 *     responses:
 *       200:
 *         description: Success
 *   post:
 *     summary: Create a new transport request
 *     tags: [TransportRequests]
 *     responses:
 *       201:
 *         description: Created
 */
router.route('/')
    .get(transportRequestController.getAllTransportRequests)
    .post(transportRequestController.createTransportRequest);

/**
 * @swagger
 * /api/v1/transportrequests/{id}:
 *   get:
 *     summary: Get a transport request by ID
 *     tags: [TransportRequests]
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
 *     summary: Update a transport request
 *     tags: [TransportRequests]
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
 *     summary: Delete a transport request
 *     tags: [TransportRequests]
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
    .get(transportRequestController.getTransportRequest)
    .put(transportRequestController.updateTransportRequest)
    .delete(transportRequestController.deleteTransportRequest);

/**
 * @swagger
 * /api/v1/transportrequests/{id}/assign:
 *   patch:
 *     summary: Assign driver and vehicle to a transport request
 *     tags: [TransportRequests]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Assigned successfully
 */
router.patch('/:id/assign', transportRequestController.assignDriverAndVehicle);

/**
 * @swagger
 * /api/v1/transportrequests/{id}/status:
 *   patch:
 *     summary: Update status of a transport request
 *     tags: [TransportRequests]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Status updated successfully
 */
router.patch('/:id/status', transportRequestController.updateTransportRequestStatus);

module.exports = router;
