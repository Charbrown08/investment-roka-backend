import { MetricUnits } from '@aws-lambda-powertools/metrics'
import { logger, metrics } from '@/lib/utils/powertools'
import middyAdapter from '@/lib/middyAdapter'
import httpResponse from '@/lib/utils/httpResponse'
import createUserSchema from '@/lib/schemas/createUserSchema'
import putItemCommand from '@/services/dynamodb/putItemCommand'

const createUser = async (event) => {
  const {
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
  } = event.body

  try {
    await putItemCommand(
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
    )

    logger.info('Create User successfully')
    metrics.addMetric('CreateUserSuccess', MetricUnits.Count, 1)
    return httpResponse.ok('user create with success')
  } catch (error) {
    logger.error(error)

    metrics.addMetric('CreateUserError', MetricUnits.Count, 1)
    return httpResponse.error({ error: error })
  }
}

export const handler = middyAdapter.adapter(createUser, createUserSchema)
