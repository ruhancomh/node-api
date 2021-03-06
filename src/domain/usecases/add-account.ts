import { IAccountModel } from '../models/account-model'
import { AddAccountModel } from '../protocols/add-account-model'

export interface AddAccount {
  add: (account: AddAccountModel) => Promise<IAccountModel>
}
