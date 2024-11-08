import BaseEntity from "../BaseEntity";

export class GetAccountsByUserReturn extends BaseEntity {
  public accountId?: number;
  public agencyNumber?: string;
  public accountNumber?: string;
  public accountName?: string;
  public institutionName?: string;
  public userId?: number;
  public accountFlagId?: number;
  public balance?: number;
  public transactionType?: number;
}
