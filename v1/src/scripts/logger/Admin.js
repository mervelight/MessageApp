const { createLogger, format, transports } = require('winston')

const logger = createLogger({
  level: 'info',
  format: format.json(),
  defaultMeta: { service: 'Admin-service' },
  transports: [
    new transports.File({
      filename: 'v1/src/logs/Admins/Admin-error.log',
      level: 'error',
      format: format.combine(
        format.timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }),
        format.align(),
        format.printf(
          (info) => `${info.level}: ${[info.timestamp]}: ${info.message}`
        )
      ),
    }),
    new transports.File({
      filename: 'v1/src/logs/Admins/Admin.log',
      format: format.combine(
        format.timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }),
        format.align(),
        format.printf(
          (info) => `${info.level}: ${[info.timestamp]}: ${info.message}`
        )
      ),
    }),
  ],
})

module.exports = logger
