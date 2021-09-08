const purchaseInvoicesService = require('./purchaseInvoices-service')

class DashService {
  constructor () {}

  async getListCategory (customerId, data, screen) {
    return purchaseInvoicesService.groupbyCategory(
      customerId,
      data,
      screen
    )
  }

  async getCategorySub (customerId, data, screen, category) {
    return purchaseInvoicesService.groupbyCategory(
      customerId,
      data,
      screen,
      category
    )
  }
}
module.exports = new DashService()
