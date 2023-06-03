import { env } from 'process';

export default function strictEnv(name: string) {
  if (!env[name]) throw new Error(name + ' is not defined in env');
  return env[name];
}
