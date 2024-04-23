import { SESClient, SendRawEmailCommand } from '@aws-sdk/client-ses'
import configClient from '@/lib/utils/configClient'
const client = new SESClient(configClient)

const sendRawEmailCommand = async (
  source = '',
  destinations = [],
  rawData,
  fromArn = null,
  sourceArn = null,
  returnPath = null,
  configSetname = null
) => {
  const input = {
    Source: source,
    Destinations: destinations,
    RawMessage: {
      Data: rawData
    },
    FromArn: fromArn,
    SourceArn: sourceArn,
    ReturnPathArn: returnPath,
    ConfigurationSetName: configSetname
  }

  return await client.send(new SendRawEmailCommand(input))
}

export { sendRawEmailCommand }
