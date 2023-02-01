import ProductsFactory from '../models/dao/products/Products.factory.js'
import Reminder from '../models/reminder.model.js'

const dao = ProductsFactory.getProductsDao()

let instance = null

export default class ProductsService {
  
  get(query) {
    return dao.get(query)
      .map(reminderDao => new Reminder(reminderDao))
  }

  create(reminderDto) {
    const reminderDao = dao.create(reminderDto)
    return new Reminder(reminderDao)
  }

  getById(id) {
    return new Reminder(dao.getById(id))
  }

  updateById(id, reminderDto) {
    return new Reminder(dao.updateById(id, reminderDto))
  }

  deleteById(id) {
    return new Reminder(dao.deleteById(id))
  }

  deleteMany(criteria) {
    return dao.deleteMany(criteria)
      .map(reminderDao => new Reminder(reminderDao))
  }

  static getInstance() {
    if (!instance) {
      instance = new ProductsService()
    }
    return instance
  }
}