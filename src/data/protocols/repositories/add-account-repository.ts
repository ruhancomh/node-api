import { AccountModel } from '../../../domain/models/account-model'
import { AddAccountModel } from '../../../domain/protocols/add-account-model'

export interface AddAccountRepository {
  add: (account: AddAccountModel) => Promise<AccountModel>
}
