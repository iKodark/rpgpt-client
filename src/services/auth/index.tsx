import { AxiosResponse } from "axios";

import api from "../incerceptor";

const BASE_URL = import.meta.env.VITE_API_URL;
const BASE_ENDPOINT = "auth";

type SigninProps = {
  login: string,
  password: string
}

const Signin = async ({ login, password }: SigninProps): Promise<AxiosResponse> => {
  return api.post(`${BASE_URL}/${BASE_ENDPOINT}/login`, { login, password });
}

type SignupProps = {
  username: string,
  email: string,
  password: string
}

const Signup = async ({ username, email, password }: SignupProps): Promise<AxiosResponse> => {
  return api.post(`${BASE_URL}/${BASE_ENDPOINT}/register`, { username, email, password });
}

export {
  Signin,
  Signup
}