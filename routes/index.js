var express = require("express");
var {
  authenticateClientToken,
  authenticateAdminToken,
} = require("../middleware/auth.middleware");
var router = express.Router();
var newsController = require("../controllers/news.controller");
var destinationController = require("../controllers/destination.controller");
var userController = require("../controllers/user.controller");
var bannerController = require("../controllers/banner.controller");
var authController = require("../controllers/auth.controller");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.status(200).json({ message: "Welcome to the Aime API" });
});

// PRIVATE ROUTES
/* Client route */
router.get("/user/:uuid", authenticateClientToken, userController.get);
router.patch("/user/:uuid", authenticateClientToken, userController.update);
router.post("/user", authenticateClientToken, userController.create);
/* Admin route */
router.get("/user", authenticateAdminToken, userController.getAll); // get all user
router.delete("/user/:uuid", authenticateAdminToken, userController.delete); // delete user
router.post(
  "/destination",
  authenticateAdminToken,
  destinationController.create
); // create destination
router.patch(
  "/destination/:id",
  authenticateAdminToken,
  destinationController.patch
); // update destination
router.delete(
  "/destination/:id",
  authenticateAdminToken,
  destinationController.delete
); // delete destination
router.post("/banner", authenticateAdminToken, bannerController.createBanner); // create banner
router.patch(
  "/banner/:id",
  authenticateAdminToken,
  bannerController.updateBanner
); // update banner
router.delete(
  "/banner/:id",
  authenticateAdminToken,
  bannerController.deleteBanner
); // delete banner

// PUBLIC ROUTES
router.get("/press-release", newsController.getPressRelease);
router.get("/news", newsController.getNews);
router.get("/destination", destinationController.get);
router.get("/destination/popular", destinationController.getPopularDestination);
router.post("/destination/check", destinationController.check);
router.get("/destination/history/:uuid", destinationController.history);
router.get("/banner", bannerController.getBanner);
router.post("/auth/login/admin", authController.login);
router.post("/auth/login/client", authController.clientLogin);
module.exports = router;
