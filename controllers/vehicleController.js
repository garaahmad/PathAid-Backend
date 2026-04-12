const Vehicle = require('../models/vehicleModel');
const TransportRequest = require('../models/transportRequestModel');

exports.getAllVehicles = async (req, res, next) => {
    try {
        const docs = await Vehicle.find();
        res.status(200).json(docs);
    } catch (err) { next(err); }
};

exports.getVehicle = async (req, res, next) => {
    try {
        const doc = await Vehicle.findOne({ id: req.params.id });
        if (!doc) return res.status(404).json({ message: 'Vehicle not found' });
        res.status(200).json(doc);
    } catch (err) { next(err); }
};

exports.getAvailableVehiclesForRequest = async (req, res, next) => {
    try {
        const requestId = req.params.requestId;
        const request = await TransportRequest.findOne({ id: requestId });
        
        if (!request) return res.status(404).json({ message: 'Transport request not found' });

        const busyStatuses = ['ACCEPTED', 'IN_TRANSIT', 'COMPLETED'];
        
        const transportTime = new Date(request.transportTime);
        const start = new Date(transportTime.getTime() - 60 * 60 * 1000);
        const end = new Date(transportTime.getTime() + 60 * 60 * 1000);

        // Find busy vehicle IDs
        const busyRequests = await TransportRequest.find({
            vehicleId: { $exists: true, $ne: null },
            status: { $in: busyStatuses },
            transportTime: { $gte: start, $lte: end }
        });

        const busyVehicleIds = busyRequests.map(r => r.vehicleId);

        // Find available vehicles
        const availableVehicles = await Vehicle.find({
            status: 'ACTIVE',
            id: { $nin: busyVehicleIds }
        });

        res.status(200).json(availableVehicles);
    } catch (err) { next(err); }
};

exports.createVehicle = async (req, res, next) => {
    try {
        const doc = await Vehicle.create(req.body);
        res.status(201).json(doc);
    } catch (err) { next(err); }
};

exports.updateVehicle = async (req, res, next) => {
    try {
        const doc = await Vehicle.findOneAndUpdate({ id: req.params.id }, req.body, { new: true });
        if (!doc) return res.status(404).json({ message: 'Vehicle not found' });
        res.status(200).json(doc);
    } catch (err) { next(err); }
};

exports.deleteVehicle = async (req, res, next) => {
    try {
        const doc = await Vehicle.findOneAndDelete({ id: req.params.id });
        if (!doc) return res.status(404).json({ message: 'Vehicle not found' });
        res.status(204).send();
    } catch (err) { next(err); }
};
