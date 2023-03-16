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
        const status = await destinationService.checkInOut(uuid, destinationId);
        res.status(200).json({ status: status });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server Error' });
    }
}

exports.history = async function (req, res) {
    const { uuid } = req.params;
    try {
        const history = await destinationService.getHistory(uuid);
        res.status(200).json(history);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server Error' });
    }
}
