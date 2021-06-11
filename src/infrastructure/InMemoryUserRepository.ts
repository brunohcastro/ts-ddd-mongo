import { User } from '../domain/user';
import { UserRepository } from '../domain/user/UserRepository';

const data: any = {};

const InMemoryUserRepository = (): UserRepository => ({
  async findAll() {
    return Object.values(data);
  },
  async store(user: User) {
    data[user.id] = user;
  }
})

export default InMemoryUserRepository;