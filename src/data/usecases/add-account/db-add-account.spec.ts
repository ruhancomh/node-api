import { AddAccountModel } from '../../../domain/protocols/add-account-model'
import { Encrypter } from '../../protocols/encrypter'
import { DbAddAccount } from './db-add-account'

describe('DbAddAccount Usecase', () => {
  test('Should call Encrypter with correct password', async () => {
    // Arrange
    const { sut, encrypterStub } = makeSut()
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

class EncrypterStub implements Encrypter {
  async encrypt (value: string): Promise<string> {
    return await new Promise(resolve => resolve('encrypted_password'))
  }
}

interface SutTypes {
  sut: DbAddAccount
  encrypterStub: EncrypterStub
}

const makeSut = (): SutTypes => {
  const encrypterStub = new EncrypterStub()
  const sut = new DbAddAccount(encrypterStub)

  return {
    sut: sut,
    encrypterStub: encrypterStub
  }
}
