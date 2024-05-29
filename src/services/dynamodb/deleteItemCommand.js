import { DynamoDBClient, DeleteItemCommand } from '@aws-sdk/client-dynamodb';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';
import configClient from '@/lib/utils/configClient';
import parsedUserSchemaResponse from '@/lib/schemas/userSchemaResponse';

const client = new DynamoDBClient(configClient);

const nameUserTable = process.env.ROKA_TABLE_NAME;
const deleteItemCommand = async (id) => {
  const input = {
    TableName: nameUserTable,
    Key: marshall({
      PK: `user#${id}`,
      SK: `user#${id}`,
    }),
  };
  const response = await client.send(new DeleteItemCommand(input));
  const userResponse = unmarshall(response.Item);
  const user = parsedUserSchemaResponse(userResponse);
  return user;
};

export default deleteItemCommand;
