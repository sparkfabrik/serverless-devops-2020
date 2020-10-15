export function FromEnvironment (variable: string): string {
  const result = process.env[variable];
  if (result !== undefined) {
    return result;
  }
  console.error(`ERROR : Unable to find environment variable ${variable} [Environment Configuration Failure]`);
  return '';
}
