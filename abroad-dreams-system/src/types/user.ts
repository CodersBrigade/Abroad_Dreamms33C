export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type UserState = {
  error: Error | string | null;
  users: User[];
  selectedUser: User | undefined;
};
