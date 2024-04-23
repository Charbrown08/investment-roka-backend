import { MetricUnits } from '@aws-lambda-powertools/metrics'
import { logger, metrics } from '@/lib/utils/powertools'
import middyAdapter from '@/lib/middyAdapter'
import httpResponse from '@/lib/utils/httpResponse'
import { sendRawEmailPdfCommand } from '@/services/ses/sendRawEmailNodemailerCommand'
import { sendRawEmailNodemailerSchema } from '@/lib/schemas/sendRawEmailNodemailerSchema'

const sendRawEmailNodemailer = async (event) => {
  const { from, to, subject, text, url } = event.body

  try {
    await sendRawEmailPdfCommand(from, to, subject, text)

    logger.info('Email sent successfully')
    metrics.addMetric('SendRawEmailSuccess', MetricUnits.Count, 1)
    return httpResponse.ok('Email sent successfully')
  } catch (error) {
    logger.error(error)
    metrics.addMetric('SendRawEmailError', MetricUnits.Count, 1)
    return httpResponse.error({ error: error })
  }
}
export const handler = middyAdapter.adapter(sendRawEmailNodemailer, sendRawEmailNodemailerSchema)
