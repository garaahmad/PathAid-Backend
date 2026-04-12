const express = require('express');
const router = express.Router({ mergeParams: true });

const areaCityMap = {
    'NORTH': ['JABALIA', 'BEIT_LAHIA', 'BEIT_HANOUN'],
    'GAZA': ['WEST_GAZA', 'CENTRAL_GAZA', 'EAST_GAZA', 'GAZA'],
    'CENTER': ['NUSEIRAT', 'MAGHAZI', 'BUREIJ', 'DEIR_AL_BALAH', 'ZAWAIDA'],
    'SOUTH': ['KHAN_YOUNIS', 'RAFAH'],
};

/**
 * @swagger
 * tags:
 *   name: Areas
 *   description: Area and city lookup
 */

/**
 * @swagger
 * /api/v1/{area}/cities:
 *   get:
 *     summary: Get cities for a specific area
 *     tags: [Areas]
 *     parameters:
 *       - in: path
 *         name: area
 *         required: true
 *         schema:
 *           type: string
 *           enum: [NORTH, GAZA, CENTER, SOUTH]
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Area not found
 */
router.get('/cities', (req, res) => {
    const area = req.params.area.toUpperCase();
    const cities = areaCityMap[area];
    if (cities) return res.status(200).json(cities);
    res.status(404).json({ message: 'المنطقة غير موجودة' });
});

module.exports = router;
