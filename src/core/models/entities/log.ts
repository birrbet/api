export interface ILog {
  logLevel: 'Info' | 'Error';
  message: string;
  stackTrace?: string;
  customerIP?: string;
}
