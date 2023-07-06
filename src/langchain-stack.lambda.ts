import * as lambda from 'aws-lambda';
// const { APPSYNC_URL } = process.env;

/**
 * @param event
 */
export async function handler(
  event: lambda.APIGatewayProxyEvent,
): Promise<lambda.APIGatewayProxyResult> {
  console.debug(`event: ${JSON.stringify(event)}`);

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `Noice`,
    }),
  };
}
