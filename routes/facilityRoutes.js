const express = require('express');
const facilityController = require('../controllers/facilityController');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Facilities
 *   description: Facility management
 */

/**
 * @swagger
 * /api/v1/facilties:
 *   get:
 *     summary: Get all facilities
 *     tags: [Facilities]
 *     responses:
 *       200:
 *         description: Success
 *   post:
 *     summary: Create a new facility
 *     tags: [Facilities]
 *     responses:
 *       201:
 *         description: Created
 */
router.route('/')
    .get(facilityController.getAllFacilities)
    .post(facilityController.createFacility);

/**
 * @swagger
 * /api/v1/facilties/{id}:
 *   get:
 *     summary: Get a facility by ID
 *     tags: [Facilities]
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
 *     summary: Update a facility
 *     tags: [Facilities]
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
 *     summary: Delete a facility
 *     tags: [Facilities]
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
    .get(facilityController.getFacility)
    .put(facilityController.updateFacility)
    .delete(facilityController.deleteFacility);

module.exports = router;
