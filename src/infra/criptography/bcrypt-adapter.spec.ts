import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt-adapter'

describe('Bcrypt Adapter', () => {
  test('Should call bcrypt with correct value', async () => {
    // Arrange
    const sut = new BcryptAdapter()
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    const bcryptSalt = 12
    // Act
    await sut.encrypt('any_value')

    // Assert
    expect(hashSpy).toHaveBeenCalledWith('any_value', bcryptSalt)
  })
})
