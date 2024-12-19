export class FinancialPlanLogsResponse {
  financialPlanId!: number;
  financialPlanName!: string;
  planStartDate!: Date;
  transferId!: number;
  userId!: number;
  accountId!: number;
  transferDate!: Date;
  transferAmount!: number;
  transferDescription?: string;
  categoryId!: number;
  categoryName!: string;
  accountFlagId?: number;
  accountFlagName?: string;
  categoryType!: number;
  dayOfWeek!: number;
}
