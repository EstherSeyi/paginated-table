export type User = {
  age: number;
  gender: string;
  id: string;
  row: number;
};

export type Data = {
  [key: string]: User[];
} & {
  paging: {
    next?: string;
    previous?: string;
  };
};
