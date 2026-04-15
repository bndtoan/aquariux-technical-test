import { create, ApisauceInstance } from 'apisauce';

export default function createApiService(): ApisauceInstance {
  const api = create({
    baseURL: `${process.env.BASE_API_URL}`,
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${process.env.API_READ_ACCESS_TOKEN}`
    },
  });
  return api;
}