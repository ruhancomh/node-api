import { InternalServerError } from '../errors/internal-server-error'
import { InvalidParamError } from '../errors/invalid-param-error'
import { MissingParamError } from '../errors/missing-param-error'
import { apiError } from '../helpers/http-response-helper'
import { BaseController } from '../protocols/base-controller'
import { EmailValidator } from '../protocols/email-validator'
import { HttpRequest } from '../protocols/http-request'
import { HttpResponse } from '../protocols/http-response'

export class SignUpController implements BaseController {
  private readonly emailValidator: EmailValidator

  constructor (emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  handle (httpRequest: HttpRequest): HttpResponse {
    try {
      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']

      for (const field of requiredFields) {
        if (httpRequest.body[field] === undefined) {
          return apiError(new MissingParamError(field))
        }
      }

      if (!this.emailValidator.isValid(httpRequest.body.email)) {
        return apiError(new InvalidParamError('email'))
      }

      return {
        statusCode: 200
      }
    } catch (error) {
      return apiError(new InternalServerError())
    }
  }
}
