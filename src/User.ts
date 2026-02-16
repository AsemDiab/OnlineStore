/*

class User for Users entity

*/

import { isValidName, isValidEmail } from "./common/validators";

export class User {
  private name: string;

  private email: string;

  constructor(name: string, email: string) {
    if (!isValidEmail(email)) {
      throw new Error(
        `Invalid email format: ${email}. Please provide a valid email address.`,
      );
    }
    if (!isValidName(name)) {
      throw new Error(
        "Invalid name: Name cannot be empty. Please provide a valid name.",
      );
    }

    this.name = name;

    this.email = email;
  }
  get _name(): string {
    return this.name;
  }
  get _email(): string {
    return this.email;
  }
}
