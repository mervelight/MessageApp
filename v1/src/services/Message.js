const Model = require("../models/Message");
const UserModel = require("../models/User");
const ChatRoomModel = require("../models/ChatRoom");

class MessageService {
  constructor() {
    this.model = new Model();
  }

  // Yeni kayıt ekler.
  async insert(data) {
    console.log("Message Create Service Çalıştı.");
    return new Promise(async (resolve, reject) => {
      await Model.create(data)
        .then((createdData) => resolve(createdData))
        .catch((err) => reject(err));
    });
  }

  //İlgili kişinin gsm bilgisini girerek mesaj gönderme
  async sendSMS(receiverID, content, senderID, chatRoomID) {
    return await new Promise(async (resolve, reject) => {
      // alıcıyı recipientGsm ile bul ve bulunan kişinin _id bilgisini receiver alanına yaz.
      const messageObject = {
        receiver: receiverID,
        sender: senderID,
        content: content,
        chatroomId: chatRoomID,
      };      
      // Mesaj oluşturulduktan sonra chatroom'a mesajın id'sini ekleyin
      await Model.create(messageObject)
        .then(async (createdMessage) => {
          resolve(createdMessage);
        })
        .catch((err) => reject(err));
    });
  }

  //Kullanıcıların kendisine gelen mesajları görüntüleyebilme
  async getUserMessages(userId) {
    console.log(`Getting messages for user with ID: ${userId}`);
    return await new Promise((resolve, reject) => {
      Model.find({ receiver: userId })
        .then((messages) => resolve(messages))
        .catch((err) => reject(err));
    });
  }

  //Okundu bilgisi
  async markMessageAsRead(messageId) {
    console.log(`Marking message with ID ${messageId} as read.`);
    return await new Promise((resolve, reject) => {
      Model.findByIdAndUpdate(messageId, { read: true }, { new: true })
        .then((updatedMessage) => resolve(updatedMessage))
        .catch((err) => reject(err));
    });
  }

  //Kullanıcının sadece okunmamış mesajları görüntüleyebilmesi
  async getUserUnreadMessages(userId) {
    console.log(`Getting unread messages for user with ID: ${userId}`);
    return await new Promise((resolve, reject) => {
      Model.find({ receiver: userId, read: false })
        .then((unreadMessages) => resolve(unreadMessages))
        .catch((err) => reject(err));
    });
  }

  //Kayıt siler.
  async deleteMessage(messageId) {
    return await new Promise((resolve, reject) => {
      Model.findByIdAndDelete(messageId)
        .then((deletedMessage) => {
          if (deletedMessage) {
            resolve(deletedMessage);
          } else {
            reject("Mesaj bulunamadı.");
          }
        })
        .catch((err) => reject(err));
    });
  }
}

module.exports = new MessageService();
