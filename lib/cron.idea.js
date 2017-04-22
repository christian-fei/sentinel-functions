// get lambda configuration
getLambda = () => lambda.getFunctionConfiguration({FunctionName: lambdaConfig.name, Qualifier: options.version}).promise(),

// extract arn and version
lambdaConfig.arn = result.FunctionArn;
lambdaConfig.version = result.Version;

// createRule
createRule = function () {
  return events.putRule({
    Name: options.name,
    ScheduleExpression: options.schedule
  }).promise();
},

// extract rule arn
.then(eventResult => {
  ruleArn = eventResult.RuleArn;
})

// addInvokePermission
addInvokePermission = function () {
  return lambda.addPermission({
    Action: 'lambda:InvokeFunction',
    FunctionName: lambdaConfig.name,
    Principal: 'events.amazonaws.com',
    SourceArn: ruleArn,
    Qualifier: options.version,
    StatementId: `${options.name}-access-${Date.now()}`
  }).promise();
},

// addRuleTarget
addRuleTarget = function () {
  return events.putTargets({
    Rule: options.name,
    Targets: [
      {
        Arn: lambdaConfig.arn,
        Id: `${lambdaConfig.name}-${options.version}-${Date.now()}`,
        Input: eventData
      }
    ]
  }).promise();
};
