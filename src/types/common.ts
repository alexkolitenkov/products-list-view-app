export interface IProduct {
  id: number;
  imageUrl: string;
  name: string;
  count: number;
  size: ISize;
  weight: string;
  comments: IComments[];
}

export interface ISize {
  width: number;
  height: number;
}

export interface IComments {
  id: number;
  productId: number;
  description: string;
  date: string;
}