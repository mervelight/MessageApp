const { createLogger, format, transports } = require('winston')

const logger = createLogger({
  level: 'info',
  format: format.json(),
  defaultMeta: { service: 'Employee-service' },
  transports: [
    new transports.File({
      filename: 'v1/src/logs/Employees/Employee-error.log',
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
      filename: 'v1/src/logs/Employees/Employee.log',
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
