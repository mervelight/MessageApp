const ChatRoomService = require("../services/ChatRoom")

//Chatroom oluşturma
async function createChatRoom(req, res) {
  const { users, messages } = req.body;
  if (!users) {
    return res
    .status(400)
    .send({error: "Eksik bilgi, kullanıcılar ve mesajlar alanları doldurulmalıdır.",});
  }
  // Burada gerekli veri doğrulama işlemleri yapılabilir.
  await ChatRoomService.createChatRoom(users, messages)
    .then((newChatRoom) => res.status(201).json(newChatRoom))
    .catch((error) => res.status(500).json({ error: error.message }));
}

// id'ye göre chatroom getirme
async function getChatRoomById(req, res) {
  const chatRoomId = req.params.id;
  if (!chatRoomId) {
    return res
      .status(400)
      .json({
        error: "Eksik bilgi, chatroom kimliği (chatRoomId) belirtilmelidir.",
      });
  }
  // Burada gerekli veri doğrulama işlemleri yapılabilir.
  await ChatRoomService.getChatRoomById(chatRoomId, req.user._id)
    .then(async(chatRoom) => res.status(200).json(chatRoom))
    .catch((error) => res.status(500).json({ error: error.message }));
}

//Chat odasındaki okunmamış mesajları getir
async function getUnreadMessagesInChatRoom(req, res) {
  const chatRoomId = req.params.id;
  if (!chatRoomId) {
    return res.status(400).json({
      error: "Eksik bilgi, chatroom kimliği (chatRoomId) belirtilmelidir.",
    });
  }
  // Burada gerekli veri doğrulama işlemleri yapılabilir.
  await ChatRoomService.getUnreadMessages(chatRoomId, req.user._id )
    .then((unreadMessages) => res.status(200).json(unreadMessages))
    .catch((error) => res.status(500).json({ error: error.message }));
}

//Chatroomdaki kullanıcıları getirir.
async function getUsersInChatRoom(req, res) {
  const chatRoomId = req.params.id;
  if (!chatRoomId) {
    return res
      .status(400)
      .json({
        error: "Eksik bilgi, chatroom kimliği (chatRoomId) belirtilmelidir.",
      });
  }
  // Burada gerekli veri doğrulama işlemleri yapılabilir.
  ChatRoomService.getUsersInChatRoom(chatRoomId)
    .then((users) => res.status(200).json(users))
    .catch((error) => res.status(500).json({ error: error.message }));
}

//Tüm chatroomları getirir.
async function getAllChatRooms(req, res) {
  // Şu an sadece chatroom'un chatRoomService aracılığıyla getirildiğini varsayıyoruz.
  ChatRoomService.getAllChatRooms()
    .then((chatRooms) => res.status(200).json(chatRooms))
    .catch((error) => res.status(500).json({ error: error.message }));
}

module.exports = {
  createChatRoom,
  getChatRoomById,
  getUnreadMessagesInChatRoom,
  getUsersInChatRoom,
  getAllChatRooms,
};
