import { TransformFnParams } from 'class-transformer';

export class TransformHelper {
  public static toLowerCase({ value }: TransformFnParams): string {
    return value ? value?.trim().toLowerCase() : value;
  }

  public static trim({ value }: TransformFnParams): string {
    return value ? value.trim() : value;
  }

  public static capitalize({ value }: TransformFnParams): string {
    return value?.toLowerCase().replace(/^./, (str) => str.toUpperCase());
  }
}
