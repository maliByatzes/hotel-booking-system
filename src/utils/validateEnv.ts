import { cleanEnv, port, str } from "envalid";


const validateEnv = () => {
  cleanEnv(process.env, {
    PORT: port(),
    NODE_ENV: str({ choices: ['development', 'test', 'production', 'staging'] }),
    POSTGRES_HOST: str({ default: '127.0.0.1' }),
    POSTGRES_PORT: port({ default: 5432 }),
    POSTGRES_USER: str(),
    POSTGRES_PASSWORD: str(),
    POSTGRES_DB: str(),
  });
};

export default validateEnv;
