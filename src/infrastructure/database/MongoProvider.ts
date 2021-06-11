import { Collection, Db } from 'mongodb';

interface Dependencies {
  db: Db;
}

const MongoProvider = ({ db }: Dependencies) => (
  collections: Array<(db: Db) => Promise<{ [name: string]: Collection<any> }>>
) => async () =>
  await collections.reduce(
    (chain, promise) => chain.then((acc) => promise(db).then((collection) => ({ ...acc, ...collection }))),
    Promise.resolve({})
  );

export default MongoProvider;