const Express = require("express");
const ChatRoomController = require("../controllers/ChatRoomController");
const { authenticateToken } = require("../middlewares/authenticate");

const router = Express.Router();

router.route("/create").post(authenticateToken,ChatRoomController.createChatRoom);
router.route("/select/:id").get(authenticateToken,ChatRoomController.getChatRoomById);
router.route("/view").get(authenticateToken,ChatRoomController.getAllChatRooms);
router.route("/view/unreadmessages/:id").get(authenticateToken,ChatRoomController.getUnreadMessagesInChatRoom);
router.route("/view/users/:id").get(authenticateToken,ChatRoomController.getUsersInChatRoom);

module.exports = router;