import validator from 'validator'
import { EmailValidatorAdapter } from './email-validator-adapter'

jest.mock('validator', () => ({
  isEmail (): boolean {
    return true
  }
}))

const makeSut = (): EmailValidatorAdapter => {
  return new EmailValidatorAdapter()
}

describe('EmailValidator Adapter', () => {
  test('Should return false if validator returns false', () => {
    // Arrange
    const sut = makeSut()
    const email = 'invalid_email@gmail.com'

    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)

    // Act
    const isValid = sut.isValid(email)

    // Assert
    expect(isValid).toBe(false)
  })

  test('Should return true if validator returns true', () => {
    // Arrange
    const sut = makeSut()
    const email = 'valid_email@gmail.com'

    // Act
    const isValid = sut.isValid(email)

    // Assert
    expect(isValid).toBe(true)
  })

  test('Should return true if validator returns true', () => {
    // Arrange
    const sut = makeSut()
    const email = 'valid_email@gmail.com'

    const isEmailSpy = jest.spyOn(validator, 'isEmail')

    // Act
    sut.isValid(email)

    // Assert
    expect(isEmailSpy).toHaveBeenCalledWith(email)
  })
})
