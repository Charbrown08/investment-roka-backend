import { DynamoDBClient, UpdateItemCommand } from '@aws-sdk/client-dynamodb'
import { marshall } from '@aws-sdk/util-dynamodb'
import configClient from '@/lib/utils/configClient'
const client = new DynamoDBClient(configClient)

const nameUserTable = process.env.ROKA_TABLE_NAME

const updateItemCommand = async (
  id,
  name,
  lastName,
  email,
  numbersPhone,
  address,
  city,
  profesion,
  age
) => {
  const input = {
    TableName: nameUserTable,
    Key: marshall({
      PK: `user#${id}`,
      SK: `user#${id}`
    }),
    AttributeUpdates: marshall(
      {
        name: {
          Action: 'PUT',
          Value: name
        },
        lastName: {
          Action: 'PUT',
          Value: lastName
        },
        email: {
          Action: 'PUT',
          Value: email
        },
        numbersPhone: {
          Action: 'PUT',
          Value: numbersPhone
        },
        address: {
          Action: 'PUT',
          Value: address
        },
        city: {
          Action: 'PUT',
          Value: city
        },
        profesion: {
          Action: 'PUT',
          Value: profesion
        },
        age: {
          Action: 'PUT',
          Value: age
        }
      },
      {
        removeUndefinedValues: true
      },
      {
        convertEmptyValues: true
      }
    ),
    ReturnValues: 'ALL_NEW'
  }
  return await client.send(new UpdateItemCommand(input))
}

export default updateItemCommand
