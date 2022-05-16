export declare global {
  interface Image {
    id: string;
    attributes: { width: number; height: number; hash: string };
  }

  interface SimpleProduct {
    id: string;
    attributes: {
      name: string;
      price: number;
      category: string;
      slug: string;
      color: string;
      promotionPrice: number | null;
      images: {
        data: Image[];
      };
    };
  }

  interface Product {
    id: string;
    attributes: {
      name: string;
      price: number;
      category: string;
      slug: string;
      description: string;
      promotionPrice: number | null;
      color: string;
      sizes: number[];
      productVariants: {
        data: {
          attributes: {
            products: {
              data: {
                id: string;
                attributes: {
                  slug: string;
                  images: {
                    data: Image[];
                  };
                };
              }[];
            };
          };
        };
      };
      reviews: {
        data: Review[];
      };
      images: {
        data: Image[];
      };
    };
  }

  interface CartProduct extends SimpleProduct {
    quantity: number;
    size: number;
  }

  interface Cart {
    id: string;
    attributes: {
      products: CartProduct[];
    };
    opened: boolean;
  }

  interface DiscountCode {
    code: string;
    value: number;
    type: 'flat' | 'percentage';
  }

  interface Order {
    data: {
      id: number;
      attributes: {
        email: string;
        totalValue: number;
        variants: { [slug: string]: number };
        products: { data: SimpleProduct[] };
      };
    };
  }

  interface Review {
    id: string;
    attributes: {
      content: string;
      stars: number;
      createdAt: string;
      user: {
        data: {
          attributes: {
            username: string;
          };
        };
      };
    };
  }

  interface User {
    id: string;
    username: string;
    email: string;
  }
}
