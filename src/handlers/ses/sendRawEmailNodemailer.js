import { MetricUnits } from '@aws-lambda-powertools/metrics'
import { logger, metrics } from '@/lib/utils/powertools'
import middyAdapter from '@/lib/middyAdapter'
import httpResponse from '@/lib/utils/httpResponse'
import { sendRawEmailNodemailerCommand } from '@/services/ses/sendRawEmailNodemailerCommand'
import { sendRawEmailNodemailerSchema } from '@/lib/schemas/sendRawEmailNodemailerSchema'

const sendRawEmailNodemailer = async (event) => {
  const { from, to, cc, bcc, subject, text, html, url } = event.body
  console.log('🚀 ~ sendRawEmailNodemailer ~  event.body:', event.body)

  try {
    await sendRawEmailNodemailerCommand(from, to, cc, bcc, subject, text, html, url)

    logger.info('Email sent successfully')
    metrics.addMetric('SendRawEmailSuccess', MetricUnits.Count, 1)
    return httpResponse.ok('Email sent successfully')
  } catch (error) {
    console.log('🚀 ~ sendRawEmailNodemailer ~ error:', error)

    logger.error(error)
    metrics.addMetric('SendRawEmailError', MetricUnits.Count, 1)
    return httpResponse.error({ error: error })
  }
}
export const handler = middyAdapter.adapter(sendRawEmailNodemailer, sendRawEmailNodemailerSchema)
