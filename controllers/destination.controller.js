var destinationService = require('../services/destination.service');
exports.get = async function (req, res) {  
    try {
        var destination = await destinationService.getDestination();
        res.status(200).json(destination);
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });
    }
};
