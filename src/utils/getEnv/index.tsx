type Environment = 'dev' | 'prd';

export function getEnv(): Environment {
  if (process.env.REACT_APP_PRD === 'true') return 'prd';

  return (process.env.REACT_APP_DEFAULT_ENV || 'dev') as Environment;
}
