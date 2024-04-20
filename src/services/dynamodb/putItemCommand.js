import { DynamoDBClient, PutItemCommand } from '@aws-sdk/client-dynamodb'
import { marshall } from '@aws-sdk/util-dynamodb'
import configClient from '@/lib/utils/configClient'
const client = new DynamoDBClient(configClient)

const nameUserTable = process.env.ROKA_TABLE_NAME

const putItemCommand = async (
  id,
  name,
  surname,
  age,
  city,
  email,
  profession,
  companyName,
  phoneNumbers,
  HomeAddress,
  workAddress,
  guarantorName,
  guarantorPhone,
  guarantorAddress,
  loanAmount,
  loanDate,
  interestRate
) => {
  const input = {
    TableName: nameUserTable,
    Item: marshall(
      {
        PK: `user#${id}`,
        SK: `user#${id}`,
        GSI1PK: `user#${email}`,
        GSI1SK: `user#${email}`,
        GSI2PK: `user#${lastName}`,
        GSI2SK: `user#${lastName}`,
        GSI3PK: `user#${numbersPhone}`,
        GSI3SK: `user#${numbersPhone}`,
        id: id,
        name: name,
        lastName: lastName,
        email: email,
        numbersPhone: numbersPhone,
        address: address,
        city: city,
        profesion: profesion,
        age: age
      },
      {
        removeUndefinedValues: true
      },
      {
        convertEmptyValues: true
      }
    ),
    ReturnValues: 'ALL_OLD',
    ConditionExpression: 'attribute_not_exists(id)',
    ReturnValuesOnConditionCheckFailure: 'ALL_OLD'
  }
  console.log('🚀 ~ input:', input)
  console.log('input: ->>>>', input)
  return await client.send(new PutItemCommand(input))
}

export default putItemCommand
