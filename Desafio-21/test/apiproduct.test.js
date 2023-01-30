const request =  require('supertest')('http://localhost:8081')
const expect = require('chai').expect
const sinon = require("sinon"); 
const sandbox = sinon.createSandbox()
const api = require('../daos/servicios.js');  
const productos = api.ProductosDao;
  

describe('API Products', () => {

  afterEach(() => {
    sandbox.restore()
  })
  
  it('Should get a list a products successfully', async () => {
    sandbox
      .stub(PersonsService, 'getAll')
      .resolves('--TEST--')
    const response = await request.get('/api/productos')
    expect(response.statusCode).to.be.eq(200)
    expect(response.body).to.be.eq('--TEST--')
  })

  /*it('Should create a person successfully', async () => {
    sandbox
      .stub(PersonsService, 'create')
      .resolves('--TEST--')
    const response = await request(app)
      .post('/api/persons')
      .send({ key: '--TEST-BODY--' })
    expect(response.statusCode).to.be.eq(201)
    expect(response.body).to.be.eq('--TEST--')
    
    expect(PersonsService.create.args[0][0]).to.have.property('key')
    expect(PersonsService.create.args[0][0].key).to.be.eq('--TEST-BODY--')
  })

  it('Should get a person by id successfully', async () => {
    sandbox
      .stub(PersonsService, 'getById')
      .resolves('--TEST-DATA--')
    const response = await request(app)
      .get('/api/persons/--TEST-PARAM--')
    expect(response.statusCode).to.be.eq(200)
    expect(response.body).to.be.eq('--TEST-DATA--')
    expect(PersonsService.getById.args[0][0]).to.be.eq('--TEST-PARAM--')
  })

  it('Should get a person by id fail', async () => {
    sandbox
      .stub(PersonsService, 'getById')
      .rejects(new NotFoundError('--TEST-ERROR--'))
    const response = await request(app)
      .get('/api/persons/--TEST-PARAM--')
    expect(response.statusCode).to.be.eq(404)
    expect(response.body).to.have.property('message')
    expect(response.body.message).to.be.eq('--TEST-ERROR--')
    expect(response.body).to.have.property('status')
    expect(response.body.status).to.be.eq(404)
    expect(PersonsService.getById.args[0][0]).to.be.eq('--TEST-PARAM--')
  })

  it('Should update a person by id successfully', async () => {
    sandbox
      .stub(PersonsService, 'updateById')
      .resolves('--TEST-DATA--')
    const response = await request(app)
      .put('/api/persons/--TEST-PARAM--')
      .send({ key: '--TEST-BODY--' })
    expect(response.statusCode).to.be.eq(200)
    expect(response.body).to.be.eq('--TEST-DATA--')
    expect(PersonsService.updateById.args[0][0]).to.be.eq('--TEST-PARAM--')
    expect(PersonsService.updateById.args[0][1]).to.have.property('key')
    expect(PersonsService.updateById.args[0][1].key).to.be.eq('--TEST-BODY--')
  })

  it('Should update a person by id fail', async () => {
    sandbox
      .stub(PersonsService, 'updateById')
      .rejects(new NotFoundError('--TEST-ERROR--'))
    const response = await request(app)
      .put('/api/persons/--TEST-PARAM--')
      .send({ key: '--TEST-BODY--' })
    expect(response.statusCode).to.be.eq(404)
    expect(response.body).to.have.property('message')
    expect(response.body.message).to.be.eq('--TEST-ERROR--')
    expect(response.body).to.have.property('status')
    expect(response.body.status).to.be.eq(404)
    expect(PersonsService.updateById.args[0][0]).to.be.eq('--TEST-PARAM--')
    expect(PersonsService.updateById.args[0][1]).to.have.property('key')
    expect(PersonsService.updateById.args[0][1].key).to.be.eq('--TEST-BODY--')
  })

  it('Should delete a person by id successfully', async () => {
    sandbox
      .stub(PersonsService, 'deleteById')
      .resolves('--TEST-DATA--')
    const response = await request(app)
      .delete('/api/persons/--TEST-PARAM--')
    expect(response.statusCode).to.be.eq(200)
    expect(response.body).to.be.eq('--TEST-DATA--')
    expect(PersonsService.deleteById.args[0][0]).to.be.eq('--TEST-PARAM--')
  })

  it('Should update a person by id fail', async () => {
    sandbox
      .stub(PersonsService, 'deleteById')
      .rejects(new NotFoundError('--TEST-ERROR--'))
    const response = await request(app)
      .delete('/api/persons/--TEST-PARAM--')
    expect(response.statusCode).to.be.eq(404)
    expect(response.body).to.have.property('message')
    expect(response.body.message).to.be.eq('--TEST-ERROR--')
    expect(response.body).to.have.property('status')
    expect(response.body.status).to.be.eq(404)
    expect(PersonsService.deleteById.args[0][0]).to.be.eq('--TEST-PARAM--')
  })*/

})