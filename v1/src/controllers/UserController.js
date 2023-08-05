const {
  createPasswordToHash,
  generateAccessToken,
} = require("../scripts/utils/auth");
const UserService = require("../services/User");

//Kullanıcı oluşturma
const createUser = async (req, res) => {
  console.log("User Create Controller Çalıştı.");
  const hashedPassword = createPasswordToHash(req.body.password);
  req.body.password = hashedPassword;
  const userData = req.body;
  await UserService.insert(userData)
    .then((createdUser) => {
      return res.status(200).send(createdUser);
    })
    .catch((err) => {
      return res.status(500).send({
        code: 500,
        message: `Kaydınız yapılamadı. Hata: ${err.message}`,
      });
    });
};

//Login işlemi
const loginUser = async (req, res) => {
  console.log("Login Controller çalıştı.");
  const hashedPassword = createPasswordToHash(req.body.password);
  const gsm = req.body.gsm;
  await UserService.login(gsm, hashedPassword)
    .then((user) => {
      user.password = null;

      const accessToken = generateAccessToken(user.toObject());

      return res.status(200).send({ user: user, token: accessToken });
    })
    .catch((err) => {
      return res.status(500).send({
        code: 500,
        message: `"Giriş başarısız. Kullanıcı bulunamadı veya şifre yanlış. Hata: ${err.message}`,
      });
    });
};

//id'ye göre kullanıcı getirme işlemi
const getUserById = async (req, res) => {
  const userId = req.params.id;

  if (!userId) {
    return res.status(400).json({
      error: "Eksik bilgi, kullanıcı kimliği (userId) belirtilmelidir.",
    });
  }

  console.log("Çözülmüş Token: ", req.user);

  await UserService.getUserById(userId)
    .then((user) => {
      return res.status(200).json(user);
    })
    .catch((error) => {
      return res.status(404).json({ error: "Kullanıcı bulunamadı." });
    });
};

// //Kullanıcı güncelleme
// const updateUser = async (req, res) => {
//   console.log("User Update Controller Çalıştı.");
//   if (req.body.password) {
//     const hashedPassword = createPasswordToHash(req.body.password);
//     req.body.password = hashedPassword;
//   }

//   const userData = req.body;
//   await UserService.edit(req.params.id,userData)
//     .then((updateUser) => {
//       return res.status(200).send(updateUser);
//     })
//     .catch((err) => {
//       return res.status(500).send({
//         code: 500,
//         message: `Güncelleme yapılamadı. Hata: ${err.message}`,
//       });
//     });
// };
module.exports = {
  createUser,
  loginUser,
  getUserById,
  createPasswordToHash,
  // updateUser,
};
