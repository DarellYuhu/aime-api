var express = require("express");
var router = express.Router();
var newsController = require("../controllers/news.controller");
var destinationController = require("../controllers/destination.controller");
var userController = require("../controllers/user.controller");
var bannerController = require("../controllers/banner.controller");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

/* GET home page. */
router.get("/", function (req, res, next) {
  res.status(200).json({ message: "Welcome to the Aime API" });
});

router.get("/press-release", newsController.getPressRelease);
router.get("/news", newsController.getNews);
router.get("/destination", destinationController.get);
router.post("/destination", destinationController.create);
router.delete("/destination/:id", destinationController.delete);
router.post("/destination/check", destinationController.check);
router.get("/destination/history/:uuid", destinationController.history);
router.post("/user", userController.create);
router.get("/user/:uuid", userController.get);
router.get("/user", userController.getAll);
router.patch("/user/:uuid", userController.update);
router.post("/upload", upload.single("file"), (req, res) => {
  // const file = req.files.file;
  // res.send(file);
  console.log(req.file);
});
router.post("/banner", bannerController.createBanner);
router.get("/banner", bannerController.getBanner);
router.patch("/banner/:id", bannerController.updateBanner);
router.delete("/banner/:id", bannerController.deleteBanner);
module.exports = router;
