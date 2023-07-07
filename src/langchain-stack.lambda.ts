import * as lambda from 'aws-lambda';
import { LLMChain, SequentialChain } from 'langchain/chains';
import { OpenAI } from 'langchain/llms/openai';
import { PromptTemplate } from 'langchain/prompts';
const { OPENAI_API_KEY } = process.env;

const llm = new OpenAI({ temperature: 0.7 });

/**
 * @param event
 */
export async function handler(
  event: lambda.APIGatewayProxyEvent,
): Promise<lambda.APIGatewayProxyResult> {
  console.debug(`event: ${JSON.stringify(event)}`);

  const prompt = new PromptTemplate({
    inputVariables: ['cusine'],
    template:
      'I want to open a restaurant for {cuisine} food. Suggest a fancy name for this',
  });

  const nameChain = new LLMChain({ llm, prompt, outputKey: 'restaurant_name' });

  const promptItems = new PromptTemplate({
    inputVariables: ['restaurant_name'],
    template:
      'Suggest some menu items for {restaurant_name}. Return it as a comma separated string',
  });

  const footItemsChain = new LLMChain({ llm, prompt, outputKey: 'menu_items' });

  const chain = new SequentialChain({
    chains: [nameChain, footItemsChain],
    inputVariables: ['cuisine'],
    outputVariables: ['restaurant_name', 'menu_items'],
  });

  const response = chain.call({ cuisine });

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `Noice`,
    }),
  };
}
