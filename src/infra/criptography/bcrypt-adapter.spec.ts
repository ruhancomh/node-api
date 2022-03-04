import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt-adapter'

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return await new Promise(resolve => resolve('encrypted_value'))
  }
}))

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

  test('Should return a hash on success', async () => {
    // Arrange
    const sut = new BcryptAdapter()

    // Act
    const encryptedValud = await sut.encrypt('any_value')

    // Assert
    expect(encryptedValud).toBe('encrypted_value')
  })
})
