import { ObjectId } from 'mongodb';
import { User } from '../domain/user';
import { UserRepository } from '../domain/user/UserRepository';
import { Collections } from './database/collections';

interface Dependencies {
  collections: Collections;
}

const MongoUserRepository = ({ collections: { user } }: Dependencies): UserRepository => ({
  async findAll() {
    const users = await user.find().toArray();

    return users.map((aUser) => new User({
      id: aUser._id.toString(),
      username: aUser.username
    }));
  },
  async store(aUser: User) {
    await user.insertOne({
      _id: ObjectId.createFromHexString(aUser.id),
      username: aUser.username
    })
  }
})

export default MongoUserRepository;