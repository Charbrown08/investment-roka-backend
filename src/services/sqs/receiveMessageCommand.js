import { SQSClient, ReceiveMessageCommand } from '@aws-sdk/client-sqs';
import configClient from '@/lib/utils/configClient';
import getQueueUrlCommand from '@/services/sqs/getQueueUrlCommand';

const client = new SQSClient(configClient);

const receiveMessageCommand = async (queueName) => {
  const { QueueUrl } = await getQueueUrlCommand(queueName);
  const command = new ReceiveMessageCommand({
    QueueUrl,
    AttributeNames: ['All'],
    MaxNumberOfMessages: 1,
    MessageAttributeNames: ['All'],
    VisibilityTimeout: 0,
    WaitTimeSeconds: 0,
  });

  const result = await client.send(command);
  return result.Messages;
};

export default receiveMessageCommand;
