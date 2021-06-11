import User from './User';

export interface UserRepository {
  findAll(): Promise<User[]>;
  store(user: User): Promise<void>
}
