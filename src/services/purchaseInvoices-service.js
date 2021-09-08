const purchaseInvoicesRepository = require('../repositories/purchaseInvoices-repository')
const moment = require('moment')

class PurchaseInvoicesService {
  constructor () {
  }

  async groupbyItem (customerId, data, screen, category, days) {
    let result = []
    switch (screen) {
      case 'dash':
        result = await purchaseInvoicesRepository.groupbyItemTop(customerId, data)
        break
      case 'itemCategory':
        result = await purchaseInvoicesRepository.groupbyItemCategory(customerId, data, category)
        break
      case 'itemSubCategory':
        result = await purchaseInvoicesRepository.groupbyItemCategory(customerId, data, category)
        break
      case 'categorization':
        result = await purchaseInvoicesRepository.groupbyItemCategorization(customerId, data, category)
        break
    }
    return result
  }
}

module.exports = new PurchaseInvoicesService()
