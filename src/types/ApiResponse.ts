import { KeyWithStringValue } from "./KeyWithStringValue";

export interface ApiResponse<T = null> {
    status: number,
    success: boolean;
    message: string;
    data: T;
    error: {
        message: string;
        issues?: KeyWithStringValue
    } | null;
}
  