export const env = {
  mongoUri: process.env.MONGO_URL ?? 'mongodb://localhost:27017/node-api',
  serverPort: process.env.SERVER_PORT ?? 5050
}
