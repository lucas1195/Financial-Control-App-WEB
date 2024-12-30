import type { DailyData } from "./DailyData";

export class WeeklyFinancialPlanLogs {
  public weekStartDate?: Date;
  public weekBalance?: number;
  public dailyData?: Array<DailyData>;
}
