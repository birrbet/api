export enum ReportType {
  SALES_SUMMARY = 'SALES_SUMMARY',
}
export interface IReport {
  reportType: ReportType;
  value: string; // json format;
}
