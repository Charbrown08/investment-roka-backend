import { GetItemCommand, DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { marshall } from '@aws-sdk/util-dynamodb';
import clientConfig from '@/lib/utils/configClient';

const client = new DynamoDBClient(clientConfig);

const nameUserTable = process.env.ROKA_TABLE_NAME;

const validateUserId = async (id) => {
  const userId = await client.send(
    new GetItemCommand({
      TableName: nameUserTable,
      Key: marshall({
        PK: `user#${id}`,
        SK: `user#${id}`,
      }),
    }),
  );

  return !!userId.Item;
};

const validateUserEmail = async (email) => {
  const userId = await client.send(
    new GetItemCommand({
      TableName: nameUserTable,
      Key: marshall({
        email,
      }),
    }),
  );

  return userId.Item;
};
export { validateUserId, validateUserEmail };
