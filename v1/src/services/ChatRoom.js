const Model = require("../models/ChatRoom");
const MessageModel = require("../models/Message");

class ChatRoomService {
  constructor() {
    this.model = new Model();
  }

  //Chatroom oluşturur.
  async createChatRoom(users, messages) {
    console.log("ChatRoom create service çalıştı.");
    return await new Promise(async (resolve, reject) => {
      await Model.create({ users, messages })
        .then((newChatRoom) => resolve(newChatRoom))
        .catch((error) =>
          reject(new Error("ChatRoom oluşturulamadı. Hata: " + error.message))
        );
    });
  }

  //ChatRoom'un messages dizisine yeni bir mesaj ekler.
  async addMessageToChatRoom(chatRoomId, messageId) {
    return await new Promise(async (resolve, reject) => {
      await Model.findByIdAndUpdate(chatRoomId, {
        $addToSet: { messages: messageId },
      })
        .then(() => resolve())
        .catch((error) => reject(error));
    });
  }

  //id'ye göre istenilen chatroomu getirir.
  async getChatRoomById(chatRoomId, userID) {
    return await new Promise(async (resolve, reject) => {
      await Model.findById(chatRoomId)
        .populate(["users", "messages"])
        .then((chatRoom) => {
          if (!chatRoom) {
            reject(new Error("Belirtilen chatroom bulunamadı."));
          }
          if (!chatRoom) reject(new Error("Belirtilen chatroom bulunamadı."));
          let isSender = false;
          let isReceiver = false;

          isSender = chatRoom.messages.find((MSG) => MSG.sender == userID);
          isReceiver = chatRoom.messages.find((MSG) => MSG.receiver == userID);


          if (chatRoom.messages.length > 0 && !isSender && !isReceiver ) {
            reject(new Error("İlgili mesajları görüntüleyemezsiniz!"));
          }

          chatRoom.users.forEach((userData) => (userData.password = null));
          chatRoom.messages.forEach((messageData) => {
            MessageModel.findOneAndUpdate(
              { _id: messageData._id },
              { read: true }
            )
              .then((data) => {})
              .catch((err) => {});
          });
          // okundu bilgisini güncelle.
          resolve(chatRoom);
        })
        .catch((error) =>
          reject(
            new Error("Chatroom getirilirken bir hata oluştu. " + error.message)
          )
        );
    });
  }

  //id'ye göre istenilen chatroomdaki okunmamış mesajları getirir.
  async getUnreadMessages(chatRoomId, userID) {
    return await new Promise(async (resolve, reject) => {
      await Model.findById(chatRoomId)
        .populate(["users", "messages"])
        .then(async (chatRoom) => {
          if (!chatRoom) reject(new Error("Belirtilen chatroom bulunamadı."));
          const isSender =
            chatRoom.messages.filter((MSG) => MSG.sender == userID).length > 0
              ? true
              : false;
          const isReceiver =
            chatRoom.messages.filter((MSG) => MSG.receiver == userID).length > 0
              ? true
              : false;

          if (!isSender && !isReceiver)
            reject(new Error("İlgili mesajları görüntüleyemezsiniz!"));

          console.log(chatRoom);
          // Chatroom'un mesajları arasında, okunmamış olanları bulun
          const unreadMessages = [];
          for await (const MSSG of chatRoom.messages) {
            if (MSSG.read == false) unreadMessages.push(MSSG);
          }
          resolve(unreadMessages);
        })
        .catch((error) =>
          reject(
            new Error(
              "Okunmamış mesajları getirirken bir hata oluştu. " + error.message
            )
          )
        );
    });
  }

  //ChatRoom'daki kullanıcıları getirir.
  async getUsersInChatRoom(chatRoomId) {
    return await new Promise(async (resolve, reject) => {
      await Model.findById(chatRoomId)
        .populate("users")
        .exec()
        .then((chatRoom) => {
          if (!chatRoom) {
            throw new Error("Belirtilen chatroom bulunamadı.");
          }
          resolve(chatRoom.users);
        })
        .catch((error) =>
          reject(
            new Error(
              "Chatroomdaki kullanıcılar getirilirken bir hata oluştu. " +
                error.message
            )
          )
        );
    });
  }

  //Tüm chatroomları getirir.
  async getAllChatRooms() {
    return await new Promise(async (resolve, reject) => {
      await Model.find({})
        .then((chatRooms) => {
          resolve(chatRooms);
        })
        .catch((error) =>
          reject(
            new Error(
              "Chatroomlar getirilirken bir hata oluştu. " + error.message
            )
          )
        );
    });
  }
}

module.exports = new ChatRoomService();
