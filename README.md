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

## What to improve

* Don't save the OpenAI API Key as variable!
* Use proper AWS Api Gateway for a proper REST API

## Thx

* Thanks to codebasics to provide the Python LangChain Video which I used <https://www.youtube.com/watch?v=nAmC7SoVLd8>
