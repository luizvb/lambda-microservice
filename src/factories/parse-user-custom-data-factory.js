class ParseUserDataFactory {

    returnCustomDataFromAutorizer(event) {

        let user = (event.requestContext && event.requestContext.authorizer && event.requestContext.authorizer.user)
            ? JSON.parse(event.requestContext.authorizer.user)
            : {}
            
        if (!user.customData)
            user.customData = JSON.stringify({
                    customerId: null
            })

        return JSON.parse(user.customData)

    }

}

module.exports = new ParseUserDataFactory()