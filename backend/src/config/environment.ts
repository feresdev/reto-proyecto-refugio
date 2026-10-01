import 'dotenv/config';

const required = (name: string): string => {
  const value = process.env[name];
  if (!value) throw new Error(`Falta la variable de entorno ${name}`);
  return value;
};

export const environment = {
  port: Number(process.env.PORT ?? 3000),
  databaseUrl: required('DATABASE_URL'),
  jwtSecret: required('JWT_SECRET'),
  jwtExpiresIn: process.env.JWT_EXPIRES_IN ?? '1h',
  bcryptRounds: Number(process.env.BCRYPT_ROUNDS ?? 8),
  frontendOrigins: required('FRONTEND_ORIGINS')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean),
};
