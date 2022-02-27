import { MissingParamError } from '../errors/missing-param-error'
import { apiError } from '../helpers/http-response-helper'
import { HttpRequest } from '../protocols/http-request'
import { HttpResponse } from '../protocols/http-response'

export class SignUpController {
  handle (httpRequest: HttpRequest): HttpResponse {
    if (httpRequest.body.name === undefined) {
      return apiError(new MissingParamError('name'))
    }

    if (httpRequest.body.email === undefined) {
      return apiError(new MissingParamError('email'))
    }

    return {
      statusCode: 200
    }
  }
}
