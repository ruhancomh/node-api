import request from 'supertest'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import app from '../config/app'

describe('SignUp Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect()
  })

  afterEach(async () => {
    await MongoHelper.clear()
  })

  afterAll(async () => {
    await MongoHelper.close()
  })

  test('Should return an account on success', async () => {
    // Arrange
    const signUpData = {
      name: 'Foo',
      email: 'foo@email.com',
      password: '12345',
      passwordConfirmation: '12345'
    }

    // Act & Assert
    await request(app)
      .post('/api/v1/signup')
      .send(signUpData)
      .expect(200)
  })
})
