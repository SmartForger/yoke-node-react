import { User } from "../types/User";
import api from "./api";

export class AccountService {
  private user: User | null;

  constructor() {
    try {
      this.user = JSON.parse(localStorage.getItem('user') || '') as any;
      this.refreshUser();
    } catch {
      this.user = null;
    }
  }

  getUser() {
    return this.user;
  }

  async refreshUser() {
    if (this.user?.id) {
      this.user = await api.getUser(this.user?.id);
    }
  }

  setUser(user: User) {
    this.user = user;
    localStorage.setItem('user', JSON.stringify({ id: user.id }));
  }
}

export default new AccountService();
