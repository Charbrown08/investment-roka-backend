import { GetItemCommand, DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { marshall } from '@aws-sdk/util-dynamodb'
import clientConfig from '@/lib/utils/configClient'
// import httpResponse from '@/lib/utils/httpResponse'

const client = new DynamoDBClient(clientConfig)

const nameUserTable = process.env.ROKA_TABLE_NAME

const validateUserId = async (id) => {
  const userId = await client.send(
    new GetItemCommand({
      TableName: nameUserTable,
      Key: marshall({
        PK: `user#${id}`
      })
    })
  )

  return userId.Item
}
const validateUserEmail = async (email) => {
  const userId = await client.send(
    new GetItemCommand({
      TableName: nameUserTable,
      Key: marshall({
        email: email
      })
    })
  )

  return userId.Item
}
export { validateUserId, validateUserEmail }
