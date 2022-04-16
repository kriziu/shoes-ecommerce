import { StaticImageData } from 'next/image';

export declare global {
  interface ProductType {
    // id: string;
    title: string;
    price: number;
    image: StaticImageData;
    gender: string;
  }
}
