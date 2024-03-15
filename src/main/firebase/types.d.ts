export type AppUserType = {
  id: string;
  email: string;
  name: string;
  error: string;
};

export type UserProfile = {
  id?: string;
  email?: string;
  avatar?: string;
  image?: string;
  name?: string;
  role?: string;
  tier?: string;
};

export type UserProfileWithError = UserProfile & {
  error: string;
  verifyEmail: 'idel' | 'pending' | 'success';
};

export type LoggedInUserProfile = {
  user: UserProfile;
  error: string;
};

export type NonReturningResultType = {
  error: string;
};
