import { AddAccountRepository } from './../../protocols/repositories/add-account-repository'
import { AccountModel } from '../../../domain/models/account-model'
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

  async add (account: AddAccountModel): Promise<AccountModel> {
    const encryptedPassword = await this.encrypter.encrypt(account.password)

    const accountToAdd = Object.assign({}, account)
    accountToAdd.password = encryptedPassword

    await this.addAccountRepository.add(accountToAdd)

    return await new Promise(resolve => resolve(new AccountModel()))
  }
}
