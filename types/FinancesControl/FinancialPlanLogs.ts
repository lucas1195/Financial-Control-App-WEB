import type { FinancialPlanLogsResponse } from "./FinancialPlanLogsResponse";

export interface FinancialPlanLogs {
  dayOfWeek: number;
  transfersCount: number;
  transfersAmount: number;
  prioritySpent: number;
  personalSpent: number;
  transfers: FinancialPlanLogsResponse[];
}
