export type FormActionReturnType = {
  errors?: {
    [x: string]: string | undefined;
    [x: number]: string | undefined;
    [x: symbol]: string | undefined;
  };
  payload?: any;
  status?: "success" | "error";
};

export type ActionReturnType<T> = Promise<T | void>;
