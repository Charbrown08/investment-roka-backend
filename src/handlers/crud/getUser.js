import { MetricUnits } from '@aws-lambda-powertools/metrics'
import { logger, metrics } from '@/lib/utils/powertools'
import middyAdapter from '@/lib/middyAdapter'
import httpResponse from '@/lib/utils/httpResponse'
import getUserSchema from '@/lib/schemas/getUserSchema'
import getItemCommand from '@/services/dynamodb/getItemCommand'

const getUser = async (event) => {
  const id = event.pathParameters.id
  console.log('🚀 ~ getUser ~ id:', id)

  try {
    const response = await getItemCommand(id)
    logger.info('getUser successfully')
    metrics.addMetric('getUserSuccess', MetricUnits.Count, 1)
    return httpResponse.success(response)
  } catch (error) {
    logger.error(error)

    metrics.addMetric('getUserError', MetricUnits.Count, 1)
    return httpResponse.error({ error: error })
  }
}

export const handler = middyAdapter.adapter(getUser, getUserSchema)
