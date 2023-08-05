const Express = require("express");
const MessageController = require("../controllers/MessageController");
const { authenticateToken } = require("../middlewares/authenticate");

const router = Express.Router();

router.route("/send").post(authenticateToken, MessageController.sendMessage); //✔
router.route("/view/:id").get(authenticateToken,MessageController.viewUserMessages);
router.route("/delete/:id").delete(MessageController.deleteMessage);
// router.route("/read").get(MessageController.markMessageAsRead);
// router.route("/view/unread").get(MessageController.viewUserUnreadMessages);
module.exports = router;
