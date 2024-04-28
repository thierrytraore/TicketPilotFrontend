import { BaseModel } from "./base.model";

export class PersonModel extends BaseModel {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  role?: string;
}
