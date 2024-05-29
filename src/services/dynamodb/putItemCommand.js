import { DynamoDBClient, PutItemCommand } from '@aws-sdk/client-dynamodb';
import { marshall } from '@aws-sdk/util-dynamodb';
import moment from 'moment';
import configClient from '@/lib/utils/configClient';
import {
  calculateInterestPaymentDate,
  calculateOverdueDays,
} from '@/lib/utils/dates/dateValidations';
import { validateUserId } from '@/lib/utils/validations/userValidationTable';

const client = new DynamoDBClient(configClient);
moment().format();

const nameUserTable = process.env.ROKA_TABLE_NAME;

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
  status = true,
) => {
  // VALIDATIONS
  if (await validateUserId(id)) throw new Error('User already exists');

  const decimalInterestRate = +(interestRate / 100).toFixed(2);
  const interestPerMount = +(decimalInterestRate * loanAmount).toFixed(2);
  const systemEntryDate = new Date().toLocaleDateString();
  const calculateAmountWithInterest = +(loanAmount + interestPerMount).toFixed(2);

  const paydayDate = await calculateInterestPaymentDate(loanDate);
  const overdueDays = await calculateOverdueDays(paydayDate, interestPaid);

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
        interestRate: decimalInterestRate,
        //  automatic
        interest: interestPerMount,
        status,
        systemEntryDate,
        payday: paydayDate,
        amountWithInterest: calculateAmountWithInterest,
        daysOverdue: overdueDays,
        interestPaid,
      },
      {
        removeUndefinedValues: true,
      },
      {
        convertEmptyValues: true,
      },
    ),
    ReturnValues: 'ALL_OLD',
    ConditionExpression: 'attribute_not_exists(id)',
    ReturnValuesOnConditionCheckFailure: 'ALL_OLD',
  };
  console.log('🚀 ~ input:', input);
  console.log('input: ->>>>', input);
  return await client.send(new PutItemCommand(input));
};

export default putItemCommand;
