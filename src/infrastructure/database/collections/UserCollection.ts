import { Collection, Db, ObjectId } from 'mongodb';

export type UserModel = Collection<{
  _id: string | ObjectId;
  username: string;
}>;

const UserCollection = async (db: Db): Promise<{ user: UserModel }> => {
  const user: UserModel = db.collection('user');

  await user.createIndex({ username: 1 });

  return { user };
};

export default UserCollection;
