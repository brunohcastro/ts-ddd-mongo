import { Application } from 'express';
import { asValue, AwilixContainer } from 'awilix';

import { MongoClient } from 'mongodb';
import MongoProvider from '../../../infrastructure/database/MongoProvider';
import collections from '../../../infrastructure/database/collections';

async function database(app: Application, container: AwilixContainer, { mongodb }: Configuration) {
  const client = new MongoClient(mongodb.host, {
    auth: { user: mongodb.username, password: mongodb.password },
    useUnifiedTopology: true,
  });

  await client.connect();

  const db = client.db(mongodb.database);

  process.on('SIGTERM', async () => {
    await client.close();
    process.exit(0);
  });

  const mongoProvider = MongoProvider({ db });

  const initCollections = mongoProvider(Object.values(collections));

  const mongoCollections = await initCollections();

  container.register({
    mongo: asValue(db),
    collections: asValue(mongoCollections),
  });
}

export default database;
