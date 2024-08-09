import axios from 'axios';
import { ENVIRONMENT } from '@/config/env';

export class HttpError<T> extends Error {
  code: number;
  data: T;

  constructor(name: string, message: string, code: number, data: T) {
    super(name);
    this.name = name;
    this.message = message;
    this.code = code;
    this.data = data;
  }
}

export const axiosInstance = axios.create({
  baseURL: `${baseUrl()}`,
});

async function thenCatch(promise: Promise<any>) {
  return promise
    .then((res) => res.data)
    .catch((err) => {
      throw new HttpError(err.name, err.message, err.code, err.response?.data);
    });
}

export async function get(url: string) {
  return thenCatch(axiosInstance.get(url));
}

export async function put(url: string, { arg }: { arg: any }) {
  return await thenCatch(axiosInstance.put(url, arg));
}

export async function post(url: string, { arg }: { arg: any }) {
  return await thenCatch(axiosInstance.post(url, arg));
}


function baseUrl() {
  return ENVIRONMENT.DEV ? 'http://localhost:3000': "actualUrl";
}
