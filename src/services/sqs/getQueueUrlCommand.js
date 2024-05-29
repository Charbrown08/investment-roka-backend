import { GetQueueUrlCommand, SQSClient } from '@aws-sdk/client-sqs';
import configClient from '@/lib/utils/configClient';

const client = new SQSClient(configClient);

const getQueueUrlCommand = async (queueName) => await client.send(
  new GetQueueUrlCommand({
    QueueName: queueName,
  }),
);

export default getQueueUrlCommand;
