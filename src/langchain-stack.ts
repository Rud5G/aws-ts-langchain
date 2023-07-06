import * as core from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as nodejs from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';

export interface LangchainStackProps extends core.StackProps {}

export class LangchainStack extends core.Stack {
  constructor(scope: Construct, id: string, props: LangchainStackProps) {
    super(scope, id, props);
    const langChainLambda = new nodejs.NodejsFunction(this, 'lambda', {});

    const functionUrl = langChainLambda.addFunctionUrl({
      authType: lambda.FunctionUrlAuthType.NONE,
    });

    new core.CfnOutput(this, 'FunctionUrl', { value: functionUrl.url });
  }
}
