const User = require('../models/userModel');
const TransportRequest = require('../models/transportRequestModel');

exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find().select('-password');
        res.status(200).json(users);
    } catch (err) { next(err); }
};

exports.getUser = async (req, res, next) => {
    try {
        const user = await User.findOne({ id: req.params.id }).select('-password');
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json(user);
    } catch (err) { next(err); }
};

exports.createUser = async (req, res, next) => {
    try {
        const user = await User.create(req.body);
        user.password = undefined;
        res.status(201).json(user);
    } catch(err) { next(err); }
};

exports.updateUser = async (req, res, next) => {
    try {
        const user = await User.findOneAndUpdate({ id: req.params.id }, req.body, { new: true }).select('-password');
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json(user);
    } catch (err) { next(err); }
};

exports.deleteUser = async (req, res, next) => {
    try {
        const user = await User.findOneAndDelete({ id: req.params.id });
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(204).send();
    } catch (err) { next(err); }
};

exports.getAvailableDriversForRequest = async (req, res, next) => {
    try {
        const requestId = req.params.requestId;
        const request = await TransportRequest.findOne({ id: requestId });
        
        if (!request) return res.status(404).json({ message: 'Transport request not found' });

        const busyStatuses = ['ACCEPTED', 'IN_TRANSIT', 'COMPLETED']; // Simplified, matching common busy states
        
        const transportTime = new Date(request.transportTime);
        const start = new Date(transportTime.getTime() - 60 * 60 * 1000); // 1 hour before
        const end = new Date(transportTime.getTime() + 60 * 60 * 1000);   // 1 hour after

        // Find busy driver IDs
        const busyRequests = await TransportRequest.find({
            driverId: { $exists: true, $ne: null },
            status: { $in: busyStatuses },
            transportTime: { $gte: start, $lte: end }
        });

        const busyDriverIds = busyRequests.map(r => r.driverId);

        // Find available drivers
        const availableDrivers = await User.find({
            role: 'DRIVER',
            enabled: true,
            id: { $nin: busyDriverIds }
        }).select('-password');

        res.status(200).json(availableDrivers);
    } catch (err) { next(err); }
};
