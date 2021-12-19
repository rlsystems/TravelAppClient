export interface Result<T = any> {
    data: T;
    messages: string[];
    succeeded: boolean;
  }