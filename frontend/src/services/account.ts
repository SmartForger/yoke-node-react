import { User } from "../types/User";

export class AccountService {
  private user: User | null;

  constructor() {
    try {
      this.user = JSON.parse(localStorage.getItem('user') || '') as any;
    } catch {
      this.user = null;
    }
  }

  getUser() {
    return this.user;
  }

  setUser(user: User) {
    this.user = user;

    const newUser = { ...user };
    delete newUser.receipts;
    localStorage.setItem('user', JSON.stringify(newUser));
  }
}

export default new AccountService();
