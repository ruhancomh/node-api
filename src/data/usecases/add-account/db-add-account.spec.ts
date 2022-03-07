import { IAccountModel } from './../../../domain/models/account-model'
import { AddAccountModel } from '../../../domain/protocols/add-account-model'
import { Encrypter } from '../../protocols/encrypter'
import { DbAddAccount } from './db-add-account'
import { AddAccountRepository } from '../../protocols/repositories/add-account-repository'

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

  test('Should thow if Encrypter throws', async () => {
    // Arrange
    const { sut, encrypterStub } = makeSut()
    const accountData: AddAccountModel = {
      email: 'valid_email',
      name: 'valid_name',
      password: 'valid_password'
    }

    jest.spyOn(encrypterStub, 'encrypt')
      .mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))

    // Act
    const result = sut.add(accountData)

    // Assert
    await expect(result).rejects.toThrow()
  })

  test('Should call AddAccountRepository with correct values', async () => {
    // Arrange
    const { sut, addAccountRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addAccountRepositoryStub, 'add')
    const accountData: AddAccountModel = {
      email: 'valid_email',
      name: 'valid_name',
      password: 'valid_password'
    }

    // Act
    await sut.add(accountData)

    // Assert
    expect(addSpy).toHaveBeenCalledWith({
      email: 'valid_email',
      name: 'valid_name',
      password: 'encrypted_password'
    })
  })

  test('Should thow if AddAccountRepository throws', async () => {
    // Arrange
    const { sut, addAccountRepositoryStub } = makeSut()
    const accountData: AddAccountModel = {
      email: 'valid_email',
      name: 'valid_name',
      password: 'valid_password'
    }

    jest.spyOn(addAccountRepositoryStub, 'add')
      .mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))

    // Act
    const result = sut.add(accountData)

    // Assert
    await expect(result).rejects.toThrow()
  })

  test('Should return an account on success', async () => {
    // Arrange
    const { sut } = makeSut()
    const accountData: AddAccountModel = {
      email: 'valid_email',
      name: 'valid_name',
      password: 'valid_password'
    }

    // Act
    const account = await sut.add(accountData)

    // Assert
    expect(account).toEqual({
      id: '1',
      email: 'valid_email',
      name: 'valid_name',
      password: 'encrypted_password'
    })
  })
})

class EncrypterStub implements Encrypter {
  async encrypt (value: string): Promise<string> {
    return await new Promise(resolve => resolve('encrypted_password'))
  }
}

class AddAccountRepositoryStub implements AddAccountRepository {
  async add (account: AddAccountModel): Promise<IAccountModel> {
    const fakeAccount: IAccountModel = {
      id: '1',
      email: 'valid_email',
      name: 'valid_name',
      password: 'encrypted_password'
    }

    return await new Promise(resolve => resolve(fakeAccount))
  }
}

interface SutTypes {
  sut: DbAddAccount
  encrypterStub: EncrypterStub
  addAccountRepositoryStub: AddAccountRepositoryStub
}

const makeSut = (): SutTypes => {
  const encrypterStub = new EncrypterStub()
  const addAccountRepositoryStub = new AddAccountRepositoryStub()
  const sut = new DbAddAccount(encrypterStub, addAccountRepositoryStub)

  return {
    sut: sut,
    encrypterStub: encrypterStub,
    addAccountRepositoryStub: addAccountRepositoryStub
  }
}
