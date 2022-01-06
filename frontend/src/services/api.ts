import axios, { Axios } from "axios";
import { Product } from "../types/Product";
import { Receipt } from "../types/Receipt";
import { User } from "../types/User";
import account from "./account";

const BASE_URL = 'http://localhost:5001/yoke-react-node/us-central1';

export class ApiService {
  private axios: Axios;

  constructor() {
    this.axios = axios.create({
      baseURL: BASE_URL,
    });
  }

  public async addUser(user: User): Promise<User> {
    const { data } = await this.axios.post('/addUser', user);

    account.setUser(data);

    return data;
  }

  public async updateUser(user: User): Promise<User> {
    const { data } = await this.axios.put('/updateUser', user);
    account.setUser(data);
    return data;
  }

  public async purchase(userId: string, productId: string, quantity: number): Promise<Receipt> {
    const { data } = await this.axios.post('/purchase', {
      userId,
      productId,
      quantity,
    });
    return data;
  }

  public async getProdcuts(): Promise<Product[]> {
    const { data } = await this.axios.get('/listProducts');
    return data;
  }

  public async getUser(userId: string): Promise<User> {
    const { data } = await this.axios.get('/getUser', {
      params: {
        id: userId,
      },
    });
    return data;
  }
}

export default new ApiService();
