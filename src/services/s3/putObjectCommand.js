import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import configClient from '@/lib/utils/configClient';

const client = new S3Client(configClient);

const putObjectCommand = async (bucket, key, body) => await client.send(new PutObjectCommand({ Bucket: bucket, Key: key, Body: body }));

export { putObjectCommand };
