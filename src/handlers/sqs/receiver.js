import { MetricUnits } from '@aws-lambda-powertools/metrics'
import { logger, metrics } from '@/lib/utils/powertools'

export const handler = async (event) => {
  try {
    for (record of event.Records) {
      const { messageId, body, messageAttributes } = record
      const response = {
        messageId,
        body: JSON.parse(body),
        messageAttributes
      }
      console.log('🚀 ~ handler ~ response:', response)
      logger.info('receiveMessage User successfully')
      metrics.addMetric('receiveMessageUserSuccess', MetricUnits.Count, 1)
    }
  } catch (error) {
    logger.error(error)
    metrics.addMetric('receiveMessageSqsError', MetricUnits.Count, 1)
  }
}
