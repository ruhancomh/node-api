import { AddAccountRepository } from './../../../../../data/protocols/repositories/add-account-repository'
import { AccountMongoRepository } from './account-repository'
import { MongoHelper } from './../../helpers/mongo-helper'
import { IAccountModel } from './../../../../../domain/models/account-model'
import { AddAccountModel } from './../../../../../domain/protocols/add-account-model'

describe('Account Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect()
  })

  afterAll(async () => {
    await MongoHelper.close()
  })

  test('Should return an account on success', async () => {
    // Arrange
    const sut = makeSut()
    const accountData: AddAccountModel = {
      name: 'any_name',
      email: 'any_email',
      password: 'any_password'
    }

    // Act
    const account: IAccountModel = await sut.add(accountData)

    // Assert
    expect(account).toBeTruthy()
    expect(account.id).toBeTruthy()
    expect(account.name).toBe('any_name')
    expect(account.email).toBe('any_email')
    expect(account.password).toBe('any_password')
  })
})

const makeSut = (): AddAccountRepository => {
  return new AccountMongoRepository()
}
