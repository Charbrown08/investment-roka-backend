import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import configClient from '@/lib/utils/configClient';

const client = new S3Client(configClient);

const getObjectCommand = async (bucket, keyObject) => await client.send(new GetObjectCommand({ Bucket: bucket, Key: keyObject }));

export { getObjectCommand };
