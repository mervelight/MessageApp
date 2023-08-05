const Model = require("../models/User");
const { createPasswordToHash } = require("../scripts/utils/auth");

class UserService {
  constructor() {
    this.model = new Model();
  }
  // Yeni kayıt ekler.
  async insert(data) {
    console.log("User Create Service Çalıştı.");
    return new Promise(async (resolve, reject) => {
      await Model.create(data)
        .then((createdData) => resolve(createdData))
        .catch((err) => reject(err));
    });
  }

  //Login işlemi.
  async login(gsm, password) {
    return new Promise(async (resolve, reject) => {
      console.log("Login Service Çalıştı.");
      await Model.findOne({ gsm, password })
        .then((user) => {
          if (user) {
            resolve(user);
          } else {
            reject("Kullanıcı bulunamadı veya şifre yanlış.");
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  //id'ye göre veritabanından kullanıcı getirir
  async getUserById(userId) {
    return new Promise(async (resolve, reject) => {
      await Model.findById(userId)
        .then((user) => {
          if (user) {
            resolve(user);
          } else {
            reject("Kullanıcı bulunamadı.");
          }
        })
        .catch((err) => reject(err));
    });
  }

  async getUserByGSM(gsm) {
    return new Promise(async (resolve, reject) => {
      await Model.findOne({ gsm: gsm })
        .then((user) => {
          if (user) {
            resolve(user);
          } else {
            reject("Kullanıcı bulunamadı.");
          }
        })
        .catch((err) => reject(err));
    });
  }
  //  //Kaydı günceller.
  //  async edit(id, data) {
  //   console.log("User Update Service Çalıştı.");
  //   return await new Promise(async (resolve, reject) => {
  //     await Model.findByIdAndUpdate(id, data, { new: true })
  //       .then((updatedData) => resolve(updatedData))
  //       .catch((err) => reject(err));
  //   });
  // }
}

module.exports = new UserService();
