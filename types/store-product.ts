import { StaticImageData } from "next/image";

export interface StoreProduct {
  id: number | string;
  name: string;
  price: string;
  description: string;
  image: Array<StaticImageData | string>;
}
