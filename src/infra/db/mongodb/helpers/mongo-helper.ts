import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'

export const MongoHelper = {
  mongod: MongoMemoryServer,

  async connect (): Promise<void> {
    this.mongod = await MongoMemoryServer.create()

    await mongoose.connect(this.mongod.getUri())
  },

  async close (): Promise<void> {
    await mongoose.connection.dropDatabase()
    await mongoose.connection.close()
    await this.mongod.stop()
  }
}
