const config = {
  server: {
    host: 'localhost',
    port: 3000
  },
  mongodb: {
    database: 'boilerplate',
    host: 'mongodb://localhost:27017',
    username: 'root',
    password: 'password',
  },
};

export type Configuration = typeof config;
export default config;