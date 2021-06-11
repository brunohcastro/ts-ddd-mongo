import { User } from '../../domain/user';
import {UserRepository} from '../../domain/user/UserRepository';
import { ApplicationService } from '../../lib/ApplicationService';

interface Dependencies {
  userRepository: UserRepository
}

export type ListUsersService = ApplicationService<void, User[]>;

const ListUsers = ({userRepository}: Dependencies): ListUsersService => async () => {
  const users = await userRepository.findAll();

  return users;
}

export default ListUsers;