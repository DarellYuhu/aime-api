var destinationService = require('../services/destination.service');
exports.get = async function (req, res) {  
    try {
        var destination = await destinationService.getDestination();
        res.status(200).json(destination);
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });
    }
};

exports.check = async function (req, res) {
    const { uuid, destinationId } = req.body;
    try {
        await destinationService.checkInOut(uuid, destinationId);
        res.status(200).json({ message: 'Success' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server Error' });
    }
}
