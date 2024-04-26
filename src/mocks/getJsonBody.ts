export const makeSuccessBody = <T>(data: T) => ({ code: 0, data, message: 'OK' });
export const makeErrorBody = <T>(code: number, message: string, data: T) => ({
  code: code,
  data,
  message: message,
});
