export const successResponse = <T>(data: T, message = "성공") => {
  return {
    isSuccess: true,
    code: 200,
    message,
    result: data,
  };
};

export const errorResponse = (code: number, message: string) => {
  return {
    isSuccess: false,
    code,
    message,
  };
};
