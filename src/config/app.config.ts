import { GenerativeAI } from './generativeai.config';
import { jwtConfig } from './jwt-config';

export const appConfig = () => ({
  jwtSecret: jwtConfig,
  generativeai: GenerativeAI,
});
