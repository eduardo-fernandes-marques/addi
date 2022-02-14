import { request } from '#/utils/request';

export type Login = {
  email: string;
  password: string;
};

export const postLoginEndpoint = () => 'login';

export const login = (value: Login) =>
  request.post(postLoginEndpoint(), { json: value }).json<boolean>();
