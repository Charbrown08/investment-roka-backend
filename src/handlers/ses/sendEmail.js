import { MetricUnits } from '@aws-lambda-powertools/metrics'
import { logger, metrics } from '@/lib/utils/powertools'
import middyAdapter from '@/lib/middyAdapter'
import httpResponse from '@/lib/utils/httpResponse'
import { sendEmailCommand } from '@/services/ses/sendEmailCommand'
import { sendEmailSesSchema } from '@/lib/schemas/sendEmailSesSchema'

const sendEmail = async (event) => {
  const {
    source,
    toAddress,
    ccAddress,
    bccAddress,
    dataSubject,
    bodyText,
    bodyHtml,
    replyToaddress,
    returnPath,
    sourceArn,
    returnPathArn,
    configSetname
  } = event.body

  try {
    await sendEmailCommand(
      source,
      toAddress,
      ccAddress,
      bccAddress,
      dataSubject,
      bodyText,
      bodyHtml,
      replyToaddress,
      returnPath,
      sourceArn,
      returnPathArn,
      configSetname
    )

    logger.info('Email sent successfully')
    metrics.addMetric('SendEmailSuccess', MetricUnits.Count, 1)
    return httpResponse.ok('Email sent successfully')
  } catch (error) {
    logger.error(error)
    metrics.addMetric('SendEmailError', MetricUnits.Count, 1)
    return httpResponse.error({ error: error })
  }
}

export const handler = middyAdapter.adapter(sendEmail, sendEmailSesSchema)
