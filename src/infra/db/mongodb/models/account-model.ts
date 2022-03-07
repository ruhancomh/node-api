import { IAccountModel } from './../../../../domain/models/account-model'
import mongoose, { Document, Model, Schema } from 'mongoose'

export interface IAccountMongoModel extends Document, IAccountModel { }

const accountSchema = new Schema({
  name: {
    type: String
  },
  email: {
    type: String
  },
  password: {
    type: String
  }
})

export const AccountMongoModel: Model<IAccountMongoModel> = mongoose.model('Account', accountSchema)
