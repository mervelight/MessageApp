const Mongoose = require('mongoose')

const db = Mongoose.connection

db.once('open', () => {
  console.log('DB Bağlantısı Başarılıdır.')
})

db.on('error', (error) => {
  console.log('DB Bağlantısı Başarısızdır.')
  console.log(error)
})

const connectDB = async () => {
  Mongoose.set('strictQuery', true)

  await Mongoose.connect(
    `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
}

module.exports = {
  connectDB,
}
