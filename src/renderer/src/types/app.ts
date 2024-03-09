type UserIdentityProvider = 'メールアドレス' | '電話番号' | 'ユーザー名';

export type XAccountData = {
  id: string;
  userName: string;
  displayName: string;
  loginProvider: 'Google' | 'Apple' | UserIdentityProvider;
  loginProviderId: string;
  loginProviderPassword: string;
  remark: string;
};

export type XAccountListFetchStatus = {
  xAccountList: XAccountData[];
  process: 'idle' | 'addNew' | 'update' | 'delete' | 'fetch';
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
};
