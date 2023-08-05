const MessageService = require("../services/Message");
const ChatRoomService = require("../services/ChatRoom");
const UserService = require("../services/User");

//Mesaj gönderme
const sendMessage = async (req, res) => {
  const { gsm, content, chatRoomID } = req.body;
  console.log("sendMessageController çalıştı..");
  console.log("Req User: ", req.user);
  if (!gsm || !content || !chatRoomID) {
    return res
      .status(400)
      .send({
        error:
          "Eksik bilgi, gsm, mesaj ve oda bilgisi alanları doldurulmalıdır.",
      });
  }
  // Alıcıya ait chatroomun varlığını kontrol et
  await ChatRoomService.getChatRoomById(chatRoomID, req.user._id)
    .then(async (chatRoom) => {
      await UserService.getUserByGSM(gsm)
        .then(async (foundUser) => {
          // Mesajı oluşturup ilgili ChatRoom'un messages dizisine ekleyin
          await MessageService.sendSMS(
            foundUser._id,
            content,
            req.user._id,
            chatRoom._id
          ) // parametreleri ayrı ayrı gönder.
            .then(async (createdMessage) => {
              // ChatRoom'un messages dizisine eklenen mesajın ID'sini ekleyin
              await ChatRoomService.addMessageToChatRoom(
                chatRoomID,
                createdMessage._id
              )
                .then(() => {
                  // Başarılı bir şekilde mesaj gönderildi
                  return res.status(200).send(createdMessage);
                })
                .catch((error) => {
                  return res.status(500).json({
                    error: `Mesaj gönderilirken bir hata oluştu. ${error.message}`,
                  });
                });
            })
            .catch((error) => {
              return res.status(500).json({
                error: `Mesaj gönderilirken bir hata oluştu. ${error.message}`,
              });
            });
        })
        .catch((err) => {
          return res.status(500).json({
            error: `Alıcı bulunamadı. ${err.message}`,
          });
        });
    })
    .catch((err) => {
      return res.status(400).send({ error: `Belirtilen chatroom bulunamadı. Error: ${err.message}` });
    });
};

//Kullanıcıların kendilerine gelen mesajları okuyabilmesi
async function viewUserMessages(req, res) {
  const userId = req.params.id;

  if (!userId) {
    return res.status(400).json({
      error: "Eksik bilgi, kullanıcı kimliği (userId) belirtilmelidir.",
    });
  }
  await MessageService.getUserMessages(userId)
    .then((messages) => {
      res.status(200).json(messages);
    })
    .catch((error) => {
      res.status(500).json({ error: "Mesajlar getirilirken bir hata oluştu." });
    });
}

// //Okundu bilgisi
// async function markMessageAsRead(req, res) {
//   const messageId = req.params.id;

//   if (!messageId) {
//     return res.status(400).json({
//       error: "Eksik bilgi, mesaj kimliği (messageId) belirtilmelidir.",
//     });
//   }
//   await MessageService.markMessageAsRead(messageId)
//     .then((updatedMessage) => {
//       res.status(200).json(updatedMessage);
//     })
//     .catch((error) => {
//       res.status(500).json({ error: "Mesaj işaretlenirken bir hata oluştu." });
//     });
// }

// //Kullanıcının sadece okunmamış mesajları görüntüleyebilmesi
// async function viewUserUnreadMessages(req, res) {
//   const userId = req.params.id;

//   if (!userId) {
//     return res.status(400).json({
//       error: "Eksik bilgi, kullanıcı kimliği (userId) belirtilmelidir.",
//     });
//   }

//   await MessageService.getUserUnreadMessages(userId)
//     .then((unreadMessages) => {
//       res.status(200).json(unreadMessages);
//     })
//     .catch((error) => {
//       res
//         .status(500)
//         .json({ error: "Okunmamış mesajlar getirilirken bir hata oluştu." });
//     });
// }

//Mesaj siler
async function deleteMessage(req, res) {
  const messageId = req.params.id;

  if (!messageId) {
    return res.status(400).json({
      error: "Eksik bilgi, mesaj kimliği (messageId) belirtilmelidir.",
    });
  }
  await MessageService.deleteMessage(messageId)
    .then((deletedMessage) => {
      res
        .status(200)
        .json({ message: "Mesaj başarıyla silindi.", deletedMessage });
    })
    .catch((error) => {
      res.status(404).json({ error: "Mesaj silinirken bir hata oluştu." });
    });
}

module.exports = {
  sendMessage,
  viewUserMessages,
  // markMessageAsRead,
  // viewUserUnreadMessages,
  deleteMessage,
};
