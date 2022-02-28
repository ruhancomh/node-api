import { AddAccount } from '../../../domain/usecases/add-account'
import { InternalServerError } from '../../errors/internal-server-error'
import { InvalidParamError } from '../../errors/invalid-param-error'
import { MissingParamError } from '../../errors/missing-param-error'
import { apiError } from '../../helpers/http-response-helper'
import { BaseController } from '../../protocols/base-controller'
import { EmailValidator } from '../../protocols/email-validator'
import { HttpRequest } from '../../protocols/http-request'
import { HttpResponse } from '../../protocols/http-response'

export class SignUpController implements BaseController {
  private readonly emailValidator: EmailValidator
  private readonly addAccount: AddAccount

  constructor (emailValidator: EmailValidator, addAccount: AddAccount) {
    this.emailValidator = emailValidator
    this.addAccount = addAccount
  }

  handle (httpRequest: HttpRequest): HttpResponse {
    try {
      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']

      for (const field of requiredFields) {
        if (httpRequest.body[field] === undefined) {
          return apiError(new MissingParamError(field))
        }
      }

      const { name, email, password, passwordConfirmation } = httpRequest.body

      if (!this.emailValidator.isValid(email)) {
        return apiError(new InvalidParamError('email'))
      }

      if (password !== passwordConfirmation) {
        return apiError(new InvalidParamError('passwordConfirmation'))
      }

      const account = this.addAccount.add({
        email,
        password,
        name
      })

      return {
        statusCode: 200,
        body: account
      }
    } catch (error) {
      return apiError(new InternalServerError())
    }
  }
}
