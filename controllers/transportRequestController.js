const TransportRequest = require('../models/transportRequestModel');
const User = require('../models/userModel');
const Vehicle = require('../models/vehicleModel');

exports.getAllTransportRequests = async (req, res, next) => {
    try {
        const docs = await TransportRequest.find().sort({ createdAt: -1 });
        res.status(200).json(docs);
    } catch (err) { next(err); }
};

exports.getTransportRequest = async (req, res, next) => {
    try {
        const doc = await TransportRequest.findOne({ id: req.params.id });
        if (!doc) return res.status(404).json({ message: 'Request not found' });
        res.status(200).json(doc);
    } catch (err) { next(err); }
};

exports.createTransportRequest = async (req, res, next) => {
    try {
        const doc = await TransportRequest.create(req.body);
        res.status(201).json(doc);
    } catch (err) { next(err); }
};

exports.updateTransportRequest = async (req, res, next) => {
    try {
        const doc = await TransportRequest.findOneAndUpdate({ id: req.params.id }, req.body, { new: true });
        if (!doc) return res.status(404).json({ message: 'Request not found' });
        res.status(200).json(doc);
    } catch (err) { next(err); }
};

exports.assignDriverAndVehicle = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { driverId, vehicleId } = req.body;

        const request = await TransportRequest.findOne({ id });
        if (!request) return res.status(404).json({ message: 'Request not found' });

        // Java checks:
        const busyStatuses = ['ACCEPTED', 'IN_TRANSIT', 'COMPLETED'];
        if (busyStatuses.includes(request.status) || request.status === 'CANCELLED') {
            return res.status(400).json({ message: 'Transport request is already assigned or cancelled' });
        }

        if (new Date(request.transportTime) < new Date()) {
            return res.status(400).json({ message: 'Transport request time is in the past' });
        }

        const driver = await User.findOne({ id: driverId, role: 'DRIVER' });
        const vehicle = await Vehicle.findOne({ id: vehicleId });

        if (!driver) return res.status(400).json({ message: 'Invalid driver ID' });
        if (!vehicle) return res.status(400).json({ message: 'Invalid vehicle ID' });

        request.driverId = driverId;
        request.vehicleId = vehicleId;
        request.assignedAt = new Date();
        request.status = 'ACCEPTED';

        await request.save();
        res.status(200).json(request);
    } catch (err) { next(err); }
};

exports.updateTransportRequestStatus = async (req, res, next) => {
    try {
        const { status } = req.body;
        const doc = await TransportRequest.findOneAndUpdate(
            { id: req.params.id },
            { status },
            { new: true }
        );
        if (!doc) return res.status(404).json({ message: 'Request not found' });
        res.status(200).json(doc);
    } catch (err) { next(err); }
};

exports.deleteTransportRequest = async (req, res, next) => {
    try {
        const doc = await TransportRequest.findOneAndDelete({ id: req.params.id });
        if (!doc) return res.status(404).json({ message: 'Request not found' });
        res.status(204).send();
    } catch (err) { next(err); }
};
