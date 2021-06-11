import { User } from '../../domain/user';
import {UserRepository} from '../../domain/user/UserRepository';
import { ApplicationService } from '../../lib/ApplicationService';
import { ObjectId } from 'mongodb';

interface Dependencies {
  userRepository: UserRepository
}

interface UserDTO {
  username: string;
}

export type CreateUserService = ApplicationService<UserDTO, string>;

const CreateUser = ({userRepository}: Dependencies): CreateUserService => async (userData: UserDTO) => {
  const user = new User({
    id: new ObjectId().toHexString(),
    username: userData.username
  });

  await userRepository.store(user);

  return user.id;
}

export default CreateUser;