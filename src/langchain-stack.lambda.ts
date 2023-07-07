import {
  GetSecretValueCommand,
  SecretsManagerClient,
} from '@aws-sdk/client-secrets-manager';
import * as lambda from 'aws-lambda';
import { LLMChain, SequentialChain } from 'langchain/chains';
import { OpenAI } from 'langchain/llms/openai';
import { PromptTemplate } from 'langchain/prompts';

const { OPENAI_API_KEY_SECRET_ID } = process.env;

const command = new GetSecretValueCommand({
  SecretId: OPENAI_API_KEY_SECRET_ID,
});

const client = new SecretsManagerClient({ region: 'us-east-1' });

/**
 * @param event
 */
export async function handler(
  event: lambda.APIGatewayProxyEvent,
): Promise<lambda.APIGatewayProxyResult> {
  console.debug(`event: ${JSON.stringify(event)}`);

  // Get OpenAI API key from AWS Secrets Manager
  const openAIApiKey = (await client.send(command)).SecretString;

  // Initialize LangChain
  const llm = new OpenAI({ temperature: 0.7, openAIApiKey });

  const cuisine = 'german';

  const prompt = new PromptTemplate({
    inputVariables: ['cuisine'],
    template:
      'I want to open a restaurant for {cuisine} food. Suggest a fancy name for this',
  });

  const nameChain = new LLMChain({ llm, prompt, outputKey: 'restaurant_name' });

  const promptItems = new PromptTemplate({
    inputVariables: ['restaurant_name'],
    template:
      'Suggest some menu items for {restaurant_name}. Return it as a comma separated string',
  });

  const footItemsChain = new LLMChain({
    llm,
    prompt: promptItems,
    outputKey: 'menu_items',
  });

  const chain = new SequentialChain({
    chains: [nameChain, footItemsChain],
    inputVariables: ['cuisine'],
    outputVariables: ['restaurant_name', 'menu_items'],
  });

  const response = await chain.call({ cuisine });
  const restaurant_name = (
    response.restaurant_name as string | undefined
  )?.trim();
  const menu_items = (response.menu_items as string | undefined)?.trim();

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: { restaurant_name, menu_items },
    }),
  };
}
