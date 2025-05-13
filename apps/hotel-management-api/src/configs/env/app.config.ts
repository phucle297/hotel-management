import { validate } from '@libs/util/config.util';
import { registerAs } from '@nestjs/config';
import { Expose, Type } from 'class-transformer';
import { IsEnum, IsNumber } from 'class-validator';

export enum EEnvironment {
  Local = 'local',
  Development = 'dev',
  Qa = 'qa',
  Production = 'live',
  Test = 'test',
}

export class AppVariables {
  @IsNumber()
  @Expose()
  @Type(() => Number)
  // biome-ignore lint/style/useNamingConvention: env var
  APP_PORT: number;

  @IsEnum(EEnvironment)
  @Expose()
  // biome-ignore lint/style/useNamingConvention: env var
  NODE_ENV: EEnvironment;
}

export const app = registerAs('app', () => {
  const envVar = validate(process.env, AppVariables);

  return {
    ...envVar,
  };
});
