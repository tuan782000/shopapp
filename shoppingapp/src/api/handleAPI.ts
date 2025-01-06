import axiosClient from './axiosClient';

const handleAPI = async (
  url: string,
  data?: any,
  method?: 'post' | 'put' | 'get' | 'delete',
) => {
  return await axiosClient(url, {
    method: method ?? 'get',
    data,
  });
};

export class HandleAPI {
  static Brand = (
    url: string,
    data?: any,
    method?: 'post' | 'put' | 'get' | 'delete',
  ) => handleAPI(`/brands${url}`, data, method ?? 'get');
  static Category = (
    url: string,
    data?: any,
    method?: 'post' | 'put' | 'get' | 'delete',
  ) => handleAPI(`/categories${url}`, data, method ?? 'get');
  static Product = (
    url: string,
    data?: any,
    method?: 'post' | 'put' | 'get' | 'delete',
  ) => handleAPI(`/products${url}`, data, method ?? 'get');
  static Filter = (
    url: string,
    data?: any,
    method?: 'post' | 'put' | 'get' | 'delete',
  ) => handleAPI(`/products${url}`, data, method ?? 'get');
  static Profile = (
    url: string,
    data?: any,
    method?: 'post' | 'put' | 'get' | 'delete',
  ) => handleAPI(`/profiles${url}`, data, method ?? 'get');
  static Address = (
    url: string,
    data?: any,
    method?: 'post' | 'put' | 'get' | 'delete',
  ) => handleAPI(`/addresses${url}`, data, method ?? 'get');
  static Search = (
    url: string,
    data?: any,
    method?: 'post' | 'put' | 'get' | 'delete',
  ) => handleAPI(`/searches${url}`, data, method ?? 'get');
}
