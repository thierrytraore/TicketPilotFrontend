import { BaseModel } from "./base.model";
import { TagModel } from "./tag.model";

export class TicketModel extends BaseModel {
  label?: string;
  description?: string;
  status?: string;
  tags?: TagModel[]
  openedById?: string;
  closedById?: string;
}
