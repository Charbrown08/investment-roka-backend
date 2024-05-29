import { MetricUnits } from '@aws-lambda-powertools/metrics';
import { logger, metrics } from '@/lib/utils/powertools';
import middyAdapter from '@/lib/middyAdapter';
import httpResponse from '@/lib/utils/httpResponse';
import updateUserSchema from '@/lib/schemas/updateUserSchema';
import putItemCommand from '@/services/dynamodb/putItemCommand';

const updateUser = async (event) => {
  const { id } = event.body;

  try {
    const response = await putItemCommand(id);
    logger.info('updateUser successfully');
    metrics.addMetric('updateUserSuccess', MetricUnits.Count, 1);
    return httpResponse.success(response);
  } catch (error) {
    logger.error(error);

    metrics.addMetric('updateUserError', MetricUnits.Count, 1);
    return httpResponse.error({ error });
  }
};

export const handler = middyAdapter.adapter(updateUser, updateUserSchema);
