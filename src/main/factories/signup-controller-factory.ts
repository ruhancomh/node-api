import { AccountMongoRepository } from './../../infra/db/mongodb/repositories/account/account-repository'
import { BcryptAdapter } from './../../infra/criptography/bcrypt-adapter'
import { DbAddAccount } from './../../data/usecases/add-account/db-add-account'
import { EmailValidatorAdapter } from './../../utils/email-validator-adapter'
import { SignUpController } from './../../presentation/controllers/signup/signup-controller'

export const makeSignUpController = (): SignUpController => {
  const emailValidator = new EmailValidatorAdapter()

  const encrypter = new BcryptAdapter()
  const accountRepository = new AccountMongoRepository()
  const addAccount = new DbAddAccount(encrypter, accountRepository)

  return new SignUpController(emailValidator, addAccount)
}
