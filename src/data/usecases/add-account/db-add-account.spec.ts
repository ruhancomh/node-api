import { AddAccountModel } from '../../../domain/protocols/add-account-model'
import { DbAddAccount } from './db-add-account'

describe('DbAddAccount Usecase', () => {
  test('Should call Encrypter with correct password', async () => {
    class EncrypterStub {
      async encrypt (value: string): Promise<string> {
        return await new Promise(resolve => resolve('encrypted_password'))
      }
    }

    // Arrange
    const encrypterStub = new EncrypterStub()
    const sut = new DbAddAccount(encrypterStub)
    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt')
    const accountData: AddAccountModel = {
      email: 'valid_email',
      name: 'valid_name',
      password: 'valid_password'
    }

    // Act
    await sut.add(accountData)

    // Assert
    expect(encryptSpy).toHaveBeenCalledWith('valid_password')
  })
})
