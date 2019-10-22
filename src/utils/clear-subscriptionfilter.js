const Cloudwatchlogs = require('aws-sdk/clients/cloudwatchlogs')

const getCloudwatchlogs = () => {

  return new Cloudwatchlogs(
    {
      apiVersion: '2014-03-28',
      accessKeyId: process.env.AWS_KEY,
      secretAccessKey: process.env.AWS_SECRET,
      region: 'us-east-1'
    })
}

const deleteSubscriptionFilter = async (logGroupName) => {

  var params = {
    filterName: 'us-east-1', /* required */
    logGroupName: logGroupName /* required */
  };
  try {
    await getCloudwatchlogs().deleteSubscriptionFilter(params).promise()
    console.log(`${logGroupName} apagado`)
  } catch (error) {
    console.log(`${logGroupName} deu erro`)
  }
  

}

//deleteSubscriptionFilter()

const describeLogGroups = async (nextToken = null) => {

  var params = {
    limit: '50',
    logGroupNamePrefix: '/aws/lambda/',
    nextToken: nextToken
  };
  return await getCloudwatchlogs().describeLogGroups(params).promise();


}

const cleanAllDashbirdfilter = async () => {

  let process = true
  let nextToken = null
  while (process) {

    let result = await describeLogGroups(nextToken);

    for (const logGroup of result.logGroups) {
      await deleteSubscriptionFilter(logGroup.logGroupName)
    }

    if (!result.nextToken)
      nextToken = result.nextToken
    else
      process = false


  }

}

cleanAllDashbirdfilter()