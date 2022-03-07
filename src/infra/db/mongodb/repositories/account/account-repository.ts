import { IAccountMongoModel, AccountMongoModel } from './../../models/account-model'
import { IAccountModel } from './../../../../../domain/models/account-model'
import { AddAccountModel } from '../../../../../domain/protocols/add-account-model'
import { AddAccountRepository } from './../../../../../data/protocols/repositories/add-account-repository'

export class AccountMongoRepository implements AddAccountRepository {
  async add (accountData: AddAccountModel): Promise<IAccountModel> {
    const account: IAccountMongoModel = new AccountMongoModel()

    account.name = accountData.name
    account.email = accountData.email
    account.password = accountData.password

    await account.save()

    return account
  }
}
