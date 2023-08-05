const Express = require("express");
const UserController = require("../controllers/UserController");

const { authenticateToken } = require("../middlewares/authenticate");

const router = Express.Router();

router.route("/register").post(UserController.createUser);
router.route("/login").post(UserController.loginUser);
router.route("/select/:id").get(authenticateToken, UserController.getUserById);
// router.route("/update/:id").put(UserController.updateUser);

module.exports = router;
