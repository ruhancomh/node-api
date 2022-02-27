import { MissingParamError } from '../errors/missing-param-error'
import { SignUpController } from './signup-controller'

describe('SignUp Controller', () => {
  test('Should return 400 if no name is provided ', () => {
    // Arrange
    const sut = new SignUpController()
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

  test('Should return 400 if no email is provided ', () => {
    // Arrange
    const sut = new SignUpController()
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
})
