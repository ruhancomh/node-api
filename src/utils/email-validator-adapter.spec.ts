import validator from 'validator'
import { EmailValidatorAdapter } from './email-validator-adapter'

jest.mock('validator', () => ({
  isEmail (): boolean {
    return true
  }
}))

describe('EmailValidator Adapter', () => {
  test('Should return false if validator returns false', () => {
    // Arrange
    const sut = new EmailValidatorAdapter()
    const email = 'invalid_email@gmail.com'

    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)

    // Act
    const isValid = sut.isValid(email)

    // Assert
    expect(isValid).toBe(false)
  })

  test('Should return true if validator returns true', () => {
    // Arrange
    const sut = new EmailValidatorAdapter()
    const email = 'valid_email@gmail.com'

    // Act
    const isValid = sut.isValid(email)

    // Assert
    expect(isValid).toBe(true)
  })
})
