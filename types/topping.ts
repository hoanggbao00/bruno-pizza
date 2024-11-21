export enum EToppingType {
  NORMAL = 'NORMAL',
  CUSTOM = 'CUSTOM'
}

export interface ITopping {
  $id: string;
  name: string;
  image: string | null;
  description: string | null;
  price: number;
  type: EToppingType;
}
