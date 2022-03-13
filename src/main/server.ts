import { connectDb } from './config/database'
import app from './config/app'
import { env } from './config/env'

connectDb()
  .then(async () => {
    app.listen(env.serverPort, () => console.log(`Server runnning at http://localhost:${env.serverPort}`))
  })
  .catch(error => console.error(error))
