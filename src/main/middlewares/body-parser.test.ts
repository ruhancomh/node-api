import request from 'supertest'
import app from '../config/app'

describe('Body Parser Middleware', () => {
  test('Should parse body as json', async () => {
    // Arrange
    app.post('/test_body_parser', (req, res) => {
      res.send(req.body)
    })

    // Acct & Assert
    await request(app)
      .post('/test_body_parser')
      .send({ name: 'any_name' })
      .expect({ name: 'any_name' })
  })
})
