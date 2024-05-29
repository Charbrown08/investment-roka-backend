import { MetricUnits } from '@aws-lambda-powertools/metrics';
import { logger, metrics } from '@/lib/utils/powertools';
import middyAdapter from '@/lib/middyAdapter';
import httpResponse from '@/lib/utils/httpResponse';
import deleteItemCommand from '@/services/dynamodb/deleteItemCommand';
import deleteUserSchema from '@/lib/schemas/deleteUserSchema';

const deleteUser = async (event) => {
  const { id } = event.body;

  try {
    const response = await deleteItemCommand(id);
    logger.info('deleteUser successfully');
    metrics.addMetric('deleteUserSuccess', MetricUnits.Count, 1);
    return httpResponse.ok('User delete correctly');
  } catch (error) {
    logger.error(error);

    metrics.addMetric('deleteUserError', MetricUnits.Count, 1);
    return httpResponse.error({ error });
  }
};

export const handler = middyAdapter.adapter(deleteUser, deleteUserSchema);
