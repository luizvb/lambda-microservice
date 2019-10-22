const dashService = require ('../../services/dash-service')
const { success, errors } = require('cmv-utils/http/body')
const parseUserCustomDataFactory = require('../../factories/parse-user-custom-data-factory')

module.exports.handler = async event => {
  try {
      let tela = "dash"
      let customData = parseUserCustomDataFactory.returnCustomDataFromAutorizer(event)
      let customerId = customData.customerId 

      let days = event.queryStringParameters.days  
      var data = new Date(); 
      
      data.setDate(data.getDate()-days)            

    return success(
      await dashService.getHomeDash(customerId,data,days,tela)
    )

  } catch (err) {
    console.log(err)
    return errors(err)
  }
}
