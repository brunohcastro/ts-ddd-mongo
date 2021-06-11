import express from 'express';
import bootstrap from './boot';

const appFactory = async () => {
  const app = express();

  await bootstrap(app);

  app.start = () => {
    const host = app.get('host');
    const port = app.get('port');

    app.listen(port, host, () => {
      console.log(`Application started. Listening at: http://${host}:${port}`);
    });
  }

  return app;
}

export default appFactory;