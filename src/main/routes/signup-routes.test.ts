import request from 'supertest'
import app from '../config/app'

describe('SignUp Routes', () => {
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
