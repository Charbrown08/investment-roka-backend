import { DynamoDBClient, UpdateItemCommand } from '@aws-sdk/client-dynamodb'
import configClient from '@/lib/utils/configClient'
import { marshall } from '@aws-sdk/util-dynamodb'

const client = new DynamoDBClient(configClient)

const tableNameUser = process.env.ROKA_TABLE_NAME

const likeUser = async (event, context) => {
  const body = event.Records[0].body
  const id = JSON.parse(body).id
  console.log('🚀 ~ likeUser ~ id :', id)

  const input = {
    tableName: tableNameUser,
    key: marshall({
      PK: `user#${id}`,
      SK: `user#${id}`
    }),
    updateExpression: 'ADD likes :likeUser',
    expressionAttributeValues: {
      ':likeUser': 1
    },
    returnValues: 'ALL_NEW'
  }

  const result = await client.send(new UpdateItemCommand(input))

  await sleep(4000)
  console.log('🚀 ~ likeUser ~ result:', result)
}

// Auxiliary function to sleep
const sleep = async (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}
export const handler = likeUser
