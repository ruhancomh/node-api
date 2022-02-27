import { HttpRequest } from '../protocols/httpRequest'
import { HttpResponse } from '../protocols/httpResponse'

export class SignUpController {
  handle (httpRequest: HttpRequest): HttpResponse {
    if (httpRequest.body.name === undefined) {
      return {
        statusCode: 400,
        body: new Error('Missing param: name')
      }
    }

    if (httpRequest.body.email === undefined) {
      return {
        statusCode: 400,
        body: new Error('Missing param: email')
      }
    }

    return {
      statusCode: 200
    }
  }
}
