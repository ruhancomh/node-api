import { AccountModel } from '../../../domain/models/account-model'
import { AddAccountModel } from '../../../domain/protocols/add-account-model'
import { AddAccount } from '../../../domain/usecases/add-account'
import { InternalServerError } from '../../errors/internal-server-error'
import { InvalidParamError } from '../../errors/invalid-param-error'
import { MissingParamError } from '../../errors/missing-param-error'
import { EmailValidator } from '../../protocols/email-validator'
import { SignUpController } from './signup-controller'

describe('SignUp Controller', () => {
  test('Should return 400 if no name is provided', () => {
    // Arrange
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        email: 'any_email@email.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }

    // Act
    const httpResponse = sut.handle(httpRequest)

    // Assert
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('name'))
  })

  test('Should return 400 if no email is provided', () => {
    // Arrange
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }

    // Act
    const httpResponse = sut.handle(httpRequest)

    // Assert
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('email'))
  })

  test('Should return 400 if no password is provided', () => {
    // Arrange
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@email.com',
        passwordConfirmation: 'any_password'
      }
    }

    // Act
    const httpResponse = sut.handle(httpRequest)

    // Assert
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('password'))
  })

  test('Should return 400 if no passwordConfirmation is provided', () => {
    // Arrange
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@email.com',
        password: 'any_password'
      }
    }

    // Act
    const httpResponse = sut.handle(httpRequest)

    // Assert
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('passwordConfirmation'))
  })

  test('Should return 400 if invalid email is provided', () => {
    // Arrange
    const { sut, emailValidatorStub } = makeSut()

    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)

    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'invalid_email@email.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }

    // Act
    const httpResponse = sut.handle(httpRequest)

    // Assert
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new InvalidParamError('email'))
  })

  test('Should return 400 if invalid passwordConfirmation is provided', () => {
    // Arrange
    const { sut } = makeSut()

    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'invalid_email@email.com',
        password: 'any_password',
        passwordConfirmation: 'invalid_password'
      }
    }

    // Act
    const httpResponse = sut.handle(httpRequest)

    // Assert
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new InvalidParamError('passwordConfirmation'))
  })

  test('Should call EmailValidator with correct email', () => {
    // Arrange
    const { sut, emailValidatorStub } = makeSut()

    const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid')

    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@email.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }

    // Act
    sut.handle(httpRequest)

    // Assert
    expect(isValidSpy).toBeCalledWith(httpRequest.body.email)
  })

  test('Should return 500 if EmailValidator error', () => {
    // Arrange
    const { sut, emailValidatorStub } = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@email.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }

    jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => {
      throw new Error()
    })

    // Act
    const httpResponse = sut.handle(httpRequest)

    // Assert
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new InternalServerError())
  })

  test('Should call AddAccount with correct values', () => {
    // Arrange
    const { sut, addAccountStub } = makeSut()

    const addSpy = jest.spyOn(addAccountStub, 'add')

    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@email.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }

    // Act
    sut.handle(httpRequest)

    // Assert
    expect(addSpy).toBeCalledWith({
      name: 'any_name',
      email: 'any_email@email.com',
      password: 'any_password'
    })
  })
})

interface SutTypes {
  sut: SignUpController
  emailValidatorStub: EmailValidator
  addAccountStub: AddAccount
}

class EmailValidatorStub implements EmailValidator {
  isValid (email: string): boolean {
    return true
  }
}

class AddAccountStub implements AddAccount {
  add (account: AddAccountModel): AccountModel {
    return {
      id: 1,
      name: 'valid_name',
      email: 'valid_email@email.com',
      password: 'valid_password'
    }
  }
}

const makeSut = (): SutTypes => {
  const emailValidator = new EmailValidatorStub()
  const addAccountStub = new AddAccountStub()
  const sut = new SignUpController(emailValidator, addAccountStub)

  return {
    sut: sut,
    emailValidatorStub: emailValidator,
    addAccountStub: addAccountStub
  }
}
