import { SQSClient, SendMessageCommand } from '@aws-sdk/client-sqs';
import configClient from '@/lib/utils/configClient';
import getQueueUrlCommand from '@/services/sqs/getQueueUrlCommand';

const client = new SQSClient(configClient);

const sendMessageCommand = async (queueName, data) => {
  const { QueueUrl } = await getQueueUrlCommand(queueName);
  return await client.send(
    new SendMessageCommand({
      QueueUrl,
      MessageBody: JSON.stringify(data),
    }),
  );
};

export default sendMessageCommand;
