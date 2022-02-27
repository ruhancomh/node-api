import { ApiError } from '../protocols/api-error'
import { HttpResponse } from '../protocols/http-response'

export const apiError = (error: ApiError): HttpResponse => {
  return {
    statusCode: error.statusCode,
    body: error
  }
}
