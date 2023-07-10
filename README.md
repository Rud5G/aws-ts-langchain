# aws-ts-langchain

This is the demo Repo for the AWS TS Language Chain Meetup in Lisbon. It uses the [LangChain TypeScript library](https://github.com/hwchase17/langchainjs).

## Bootstrap

```bash
ACCOUNT_DEV_ID=981237193288
yarn cdk bootstrap aws://$ACCOUNT_DEV_ID/us-east-1
```

## Deploy

Load your AWS credentials into your shell environment like with your AWS SSO landing page like https://damadden.awsapps.com/start#/ .

```bash
yarn cdk deploy "langchain-stack" --require-approval never
```

After deploying you need to put your OpenAI Api Key into the AWS Secret named OpenAiKey...

## First LangChain App

This LangChain App chains to LLM Chains.

Prompt 1: I want to open a restaurant for {cuisine} food. Suggest a fancy name for this.

Prompt 2: Suggest some menu items for {restaurant_name}. Return it as a comma-separated string.

Those two prompts are chained and will return the name for the restaurant and suggestions for menu items.

```bash
URL=https://mlmtzplhdet2ha3yvxuegcnhze0qepwh.lambda-url.us-east-1.on.aws
curl -X POST $URL \
    -H 'Content-type: application/json' \
    -d '{"cuisine": "German"}' | jq .
```

## Second LangChain App

This LangChain App possesses an AWS DynamoDB Memory.

Prompt: I want to open a restaurant for {cuisine} food. Suggest a fancy name for this.

```bash
URL=https://a5ewfijwkvfgrptv7z336cnfvm0yxawl.lambda-url.us-east-1.on.aws
curl -X POST $URL \
    -H 'Content-type: application/json' \
    -d '{"cuisine": "Italien", "user": "martin"}' | jq .
```

## Example queries

```bash
URL=https://mlmtzplhdet2ha3yvxuegcnhze0qepwh.lambda-url.us-east-1.on.aws


## What to improve

* Use proper AWS Api-Gateway for a proper REST API

## Thx

* Thanks to codebasics to provide the Python LangChain Video which I used <https://www.youtube.com/watch?v=nAmC7SoVLd8>
