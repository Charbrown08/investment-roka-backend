import { getObjectCommand } from '@/services/s3/getObjectCommand'
import { convertedStreamToString } from '@/lib/utils/convertedStreamToString'
import { simpleParser } from 'mailparser'
import { bodyEmailParse } from '@/lib/utils/bodyEmailParse'
import { putObjectCommand } from '@/services/s3/putObjectCommand'
const receptionEmail = async (event) => {
  for (const record of event.Records) {
    const bucket = record.s3.bucket.name
    const key = record.s3.object.key
    try {
      const object = await getObjectCommand(bucket, key)
      const body = await convertedStreamToString(object.Body)
      const bodyEmail = await simpleParser(body)
      const dataEmail = await bodyEmailParse(bodyEmail)

      await putObjectCommand(
        bucket,
        `parsedMails/${email.to}-${email.messageId}.json`,
        JSON.stringify(dataEmail)
      )
    } catch (error) {}
  }
}

export const handler = receptionEmail
