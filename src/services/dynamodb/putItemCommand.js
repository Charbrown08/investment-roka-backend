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
  homeAddress,
  workAddress,
  guarantorName,
  guarantorPhone,
  guarantorAddress,
  loanAmount,
  loanDate,
  interestRate
) => {
  let decimalInterestRate = +(interestRate / 100).toFixed(2)
  let interestPerMount = +(decimalInterestRate * loanAmount).toFixed(2)
  let systemEntryDate = new Date().toLocaleDateString()

  const input = {
    TableName: nameUserTable,
    Item: marshall(
      {
        PK: `user#${id}`,
        SK: `user#${id}`,
        GSI1PK: `user#${surname}`,
        GSI1SK: `user#${surname}`,
        GSI2PK: `user#${lastName}`,
        GSI2SK: `user#${lastName}`,
        GSI3PK: `user#${payday}`,
        GSI3SK: `user#${payday}`,
        id: id,
        name: name,
        surname: surname,
        age: age,
        city: city,
        email: email,
        profession: profession,
        companyName: companyName,
        phoneNumbers: phoneNumbers,
        homeAddress: homeAddress,
        workAddress: workAddress,
        guarantorName: guarantorName,
        guarantorPhone: guarantorPhone,
        guarantorAddress: guarantorAddress,
        loanAmount: loanAmount,
        loanDate: loanDate,
        interestRate: decimalInterestRate,
        //  automatic
        interest: interestPerMount,
        status: 'Active',
        systemEntryDate: systemEntryDate,
        payday: '19/05/2024',
        amountWithInterest: '1100.000',
        daysOverdue: '3',
        interestPaid: 'true/false'
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
