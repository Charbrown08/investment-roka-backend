import { S3Client, DeleteObjectCommand } from '@aws-sdk/client-s3'
import configClient from '@/lib/utils/configClient'
const client = new S3Client(configClient)

const DeleteObjectCommand = async (bucket, key) => {
  return await client.send(new PutObjectCommand({ Bucket: bucket, Key: key }))
}

export default { DeleteObjectCommand }
