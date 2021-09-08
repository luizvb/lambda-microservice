const dashService = require('../../services/dash-service')
const { success, errors } = require('cmv-utils/http/body')
const parseUserCustomDataFactory = require('../../factories/parse-user-custom-data-factory')

module.exports.handler = async event => {
  try {
    const tela = 'dash'
    const customData = parseUserCustomDataFactory.returnCustomDataFromAutorizer(event)
    const customerId = customData.customerId

    const days = event.queryStringParameters.days
    var data = new Date()

    data.setDate(data.getDate() - days)

    return success(
      await dashService.getHomeDash(customerId, data, days, tela)
    )
  } catch (err) {
    console.log(err)
    return errors(err)
  }
}
