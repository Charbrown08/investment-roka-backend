import { MetricUnits } from '@aws-lambda-powertools/metrics'
import { logger, metrics } from '@/lib/utils/powertools'
import httpResponse from '@/lib/utils/httpResponse'
import sendMessageCommand from '@/services/sqs/sendMessageCommand'
const sqsName = process.env.SQS_QUEUE_NAME

export const handler = async (event) => {
  const requestBody = event.body
  try {
    const response = await sendMessageCommand(sqsName, requestBody)
    logger.info('Create User successfully')
    metrics.addMetric('CreateUserSuccess', MetricUnits.Count, 1)
    return httpResponse.success(response)
  } catch (error) {
    logger.error(error)
    metrics.addMetric('SenderSqsError', MetricUnits.Count, 1)
    return httpResponse.error({ error: error })
  }
}
