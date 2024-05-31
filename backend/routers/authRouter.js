// const cookieParser = require("cookie-parser")

const router = require("express").Router();
// router.use(cookieParser());

const authController = require("../controllers/authController");
// const getUserId = require('../controllers/getUserId');
// const requireUser = require('../middlewares/requireUser');

router.post("/signup", authController.signUpController);
router.post("/login", authController.loginController);
router.get("/refresh", authController.refreshAccessTokenController);
router.post("/logout/:id", authController.logOutController);
router.get("/verifysession/:id", authController.checkValidSession);
router.get("/getuser/:id", authController.getUserDetails);
// router.post('/getuser', getUserId);

module.exports = router;
