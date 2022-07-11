import { User } from './User.model';

export interface SignUpModel extends User {
  password: string;
  confirmPassword: string;
}
