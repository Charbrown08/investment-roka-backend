import { MetricUnits } from '@aws-lambda-powertools/metrics';
import { logger, metrics } from '@/lib/utils/powertools';
import middyAdapter from '@/lib/middyAdapter';
import httpResponse from '@/lib/utils/httpResponse';
import { sendRawEmailCommand } from '@/services/ses/sendRawEmailCommand';
import { sendRawEmailSesSchema } from '@/lib/schemas/sendRawEmailSesSchema';

const sendRawEmail = async (event) => {
  const {
    source, destinations, rawData, fromArn, sourceArn, returnPath, configSetname,
  } = event.body;

  try {
    await sendRawEmailCommand(
      source,
      destinations,
      rawData,
      fromArn,
      sourceArn,
      returnPath,
      configSetname,
    );

    logger.info('Email sent successfully');
    metrics.addMetric('SendRawEmailSuccess', MetricUnits.Count, 1);
    return httpResponse.ok('Email sent successfully');
  } catch (error) {
    logger.error(error);
    metrics.addMetric('SendRawEmailError', MetricUnits.Count, 1);
    return httpResponse.error({ error });
  }
};
export const handler = middyAdapter.adapter(sendRawEmail, sendRawEmailSesSchema);
