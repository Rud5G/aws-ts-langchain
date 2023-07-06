# aws-ts-langchain

This is the demo Repo for the AWS TS Language Chain Meetup in Lisbon. It uses the langchain TypeScript library.

## Bootstrap

```bash
ACCOUNT_DEV_ID=981237193288
yarn cdk bootstrap aws://$ACCOUNT_DEV_ID/us-east-1
```

## Deploy

For deploying the stack directly. Please don't use if you know what you're doing!

```bash
yarn cdk deploy "langchain-stack" --require-approval never
```
