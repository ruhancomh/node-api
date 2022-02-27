import { BadRequestError } from './bad-request-error'

export class InvalidParamError extends BadRequestError {
  constructor (missingParamName: string) {
    super(`Invalid param: ${missingParamName}`)
    this.name = 'InvalidParamError'
  }
}
