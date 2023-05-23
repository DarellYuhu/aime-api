var bannerService = require("../services/banner.service");
exports.createBanner = async (req, res) => {
    try {
        const { title, category, url } = req.body;
        const banner = await bannerService.create(title, category, url);
        res.status(200).json({ message: "Banner created successfully", banner });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server Error" });
    }
};

exports.getBanner = async (req, res) => {
  
    try {
        const banner = await bannerService.get();
        res.status(200).json({ message: "Banner retrieved successfully", banner });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server Error" });
    }
};

exports.updateBanner = async (req, res) => {
  res.status(200).json({ message: "Welcome to the Aime API" });
};

exports.deleteBanner = async (req, res) => {
    try {
        const { id } = req.params;
        const banner = await bannerService.delete(id);
        res.status(200).json({ message: "Banner deleted successfully", banner });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server Error" });
    }
};
