import { AddAccountRepository } from './../../protocols/repositories/add-account-repository'
import { IAccountModel } from '../../../domain/models/account-model'
import { AddAccountModel } from '../../../domain/protocols/add-account-model'
import { AddAccount } from '../../../domain/usecases/add-account'
import { Encrypter } from '../../protocols/encrypter'

export class DbAddAccount implements AddAccount {
  private readonly encrypter: Encrypter
  private readonly addAccountRepository: AddAccountRepository

  constructor (encrypter: Encrypter, addAccountRepository: AddAccountRepository) {
    this.encrypter = encrypter
    this.addAccountRepository = addAccountRepository
  }

  async add (account: AddAccountModel): Promise<IAccountModel> {
    const encryptedPassword = await this.encrypter.encrypt(account.password)

    const accountToAdd = Object.assign({}, account)
    accountToAdd.password = encryptedPassword

    const accountSaved = await this.addAccountRepository.add(accountToAdd)

    return accountSaved
  }
}
