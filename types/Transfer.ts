import BaseEntity from "./BaseEntity";

export class Transfer extends BaseEntity {
  public transferId?: number;
  public userId?: number;
  public transferAmount?: number;
  public transferDescription?: string;
  public transferDate?: Date;
  public categoryId?: number;
  public accountId?: number;
}
