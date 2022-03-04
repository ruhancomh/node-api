import { Encrypter } from '../../data/protocols/encrypter'
import bcrypt from 'bcrypt'

export class BcryptAdapter implements Encrypter {
  private static readonly BCRYPT_SALT = 12

  async encrypt (value: string): Promise<string> {
    const encryptedValue = await bcrypt.hash(value, BcryptAdapter.BCRYPT_SALT)

    return encryptedValue
  }
}
