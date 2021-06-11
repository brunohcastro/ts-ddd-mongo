interface UserProps {
  readonly id: string;
  readonly username: string;
}

class User {
  public id: string;
  public username: string;

  constructor(props: UserProps) {
    this.id = props.id;
    this.username = props.username;
  }
}

export default User;