import { DynamoDBClient, PutItemCommand } from '@aws-sdk/client-dynamodb'
import { marshall } from '@aws-sdk/util-dynamodb'
import configClient from '@/lib/utils/configClient'
const client = new DynamoDBClient(configClient)
import moment from 'moment'
import {
  calculateInterestPaymentDate,
  calculateOverdueDays
} from '@/lib/utils/dates/dateValidations'
import { validateUserId } from '@/lib/utils/validations/userValidationTable'
moment().format()

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
  interestRate,
  interestPaid = false,
  status = true
) => {
  // VALIDATIONS
  if (await validateUserId(id)) throw new Error('User already exists')

  let decimalInterestRate = +(interestRate / 100).toFixed(2)
  let interestPerMount = +(decimalInterestRate * loanAmount).toFixed(2)
  let systemEntryDate = new Date().toLocaleDateString()
  let calculateAmountWithInterest = +(loanAmount + interestPerMount).toFixed(2)

  let paydayDate = await calculateInterestPaymentDate(loanDate)
  let overdueDays = await calculateOverdueDays(paydayDate, interestPaid)

  const input = {
    TableName: nameUserTable,
    Item: marshall(
      {
        PK: `user#${id}`,
        SK: `user#${id}`,
        GSI1PK: `user#${surname}`,
        GSI1SK: `user#${surname}`,
        GSI2PK: `user#${companyName}`,
        GSI2SK: `user#${companyName}`,
        GSI3PK: `user#${profession}`,
        GSI3SK: `user#${profession}`,
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
        status: status,
        systemEntryDate: systemEntryDate,
        payday: paydayDate,
        amountWithInterest: calculateAmountWithInterest,
        daysOverdue: overdueDays,
        interestPaid: interestPaid
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
