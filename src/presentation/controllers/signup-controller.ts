import { MissingParamError } from '../errors/missing-param-error'
import { apiError } from '../helpers/http-response-helper'
import { HttpRequest } from '../protocols/http-request'
import { HttpResponse } from '../protocols/http-response'

export class SignUpController {
  handle (httpRequest: HttpRequest): HttpResponse {
    const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']

    for (const field of requiredFields) {
      if (httpRequest.body[field] === undefined) {
        return apiError(new MissingParamError(field))
      }
    }

    return {
      statusCode: 200
    }
  }
}
