export type FormActionReturnType<T = any> = {
  errors?: {
    [x: string]: string | undefined;
    [x: number]: string | undefined;
    [x: symbol]: string | undefined;
  };
  payload?: T;
  status?: "success" | "error";
};

export type ActionReturnType<T> = Promise<T | void>;
