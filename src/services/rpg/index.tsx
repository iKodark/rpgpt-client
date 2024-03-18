import { AxiosResponse } from "axios";

import api from "../incerceptor";

const BASE_URL = import.meta.env.VITE_API_URL;
const BASE_ENDPOINT = "match";

const List = async (): Promise<AxiosResponse> => {
  return api.get(`${BASE_URL}/${BASE_ENDPOINT}/list`);
}

type CreateLoreProps = {
  name: string,
  race: string,
  occupation: string
}

const CreateLore = async ({ name, race, occupation }: CreateLoreProps): Promise<AxiosResponse> => {
  return api.post(`${BASE_URL}/${BASE_ENDPOINT}/generate-lore`, { name, race, occupation });
}

export {
  List,
  CreateLore
}