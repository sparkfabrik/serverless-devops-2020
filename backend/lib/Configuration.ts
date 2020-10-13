export const FromEnvironment = function(variable: string): string {
  const result = process.env[variable];
  if (result !== undefined) {
    return result;
  }
  console.log(`ERROR : Unable to find environment variable ${variable} [Environment Configuration Failure]`);
  return '';
};
