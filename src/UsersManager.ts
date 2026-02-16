import { User } from "./User";

export class UsersManager {
  private users: Record<string, User>;
  private loggedInUsers: Set<string>;

  constructor() {
    this.users = {};
    this.loggedInUsers = new Set();
  }

  // User registration
  signUp(name: string, email: string): User {
    if (this.users[email] != undefined)
      throw new Error(
        `Registration failed: Email '${email}' is already registered. Please use a different email or try logging in.`,
      );
    let user: User | null;
    try {
      user = new User(name, email);
      this.users[email] = user;
    } catch (error) {
      throw error;
    }
    return user;
  }

  // User authentication
  login(email: string): User {
    if (this.users[email] === undefined) {
      throw new Error(
        `Login failed: No account found for email '${email}'. Please check your email or register for a new account.`,
      );
    }

    this.loggedInUsers.add(email);
    return this.users[email];
  }

  // User logout
  logout(email: string): void {
    this.loggedInUsers.delete(email);
  }

  // Check if user is logged in
  isLoggedIn(email: string): boolean {
    return this.loggedInUsers.has(email);
  }

  // Get logged in user
  getLoggedInUser(email: string): User | null {
    return this.loggedInUsers.has(email) ? this.users[email] : null;
  }
}
