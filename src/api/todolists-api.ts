import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://fakestoreapi.com/'
})

export const productsAPI = {
  getProducts(limit: number) {
    return instance.get<Category[]>('products', {
      params: { limit }
    });
  }
};

export type Rating = {
  rate: number;
  count: number;
};

export type Category = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: Rating;
};

export type ResponseType<D = object> = {
  resultCode: number
  messages: Array<string>
  fieldsErrors: Array<string>
  data: D
}
