var destinationService = require("../services/destination.service");
exports.create = async function (req, res) {
  const {
    address,
    description,
    destinationName,
    imageURL,
    location,
    previewImages,
  } = req.body;
  try {
    const respons = await destinationService.createDestination(
      address,
      description,
      destinationName,
      imageURL,
      location,
      previewImages
    );
    console.log(respons);
    res.status(200).json({ message: "Destination created" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};

exports.patch = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      address,
      description,
      destinationName,
      imageURL,
      location,
      previewImages,
    } = req.body;

    await destinationService.updateDestination(
      id,
      address,
      description,
      destinationName,
      imageURL,
      location,
      previewImages
    );
    res.status(200).json({ message: "Destination updated" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server Error" });
  }
};

exports.get = async function (req, res) {
  try {
    var destination = await destinationService.getDestination();
    res.status(200).json(destination);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

exports.check = async function (req, res) {
  const { uuid, destinationId } = req.body;
  try {
    const status = await destinationService.checkInOut(uuid, destinationId);
    res.status(200).json({ status: status });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};

exports.history = async function (req, res) {
  const { uuid } = req.params;
  try {
    const history = await destinationService.getHistory(uuid);
    res.status(200).json(history);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};

exports.delete = async function (req, res) {
  try {
    const { id } = req.params;
    await destinationService.deleteDestination(id);
    res.status(200).json({ message: "Destination deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};
