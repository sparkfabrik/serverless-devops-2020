import { FromEnvironment } from './Configuration';

export function getCORSHeaders() {
  return {
    'Access-Control-Allow-Origin': FromEnvironment('CORS_VALID_ORIGINS'),
    'Access-Control-Allow-Methods': FromEnvironment('CORS_VALID_METHODS'),
    'Access-Control-Allow-Headers': 'Content-Type,Authorization'
  }
}
