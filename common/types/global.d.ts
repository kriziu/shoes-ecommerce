export declare global {
  interface Image {
    id: string;
    attributes: { width: number; height: number; url: string };
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
        data: {
          id: string;
          attributes: {
            content: string;
            createdAt: string;
            stars: number;
            customer: {
              data: {
                id: string;
                attributes: {
                  name: string;
                };
              };
            };
          };
        }[];
      };
      images: {
        data: Image[];
      };
    };
  }

  interface CartProduct extends SimpleProduct {
    quantity: number;
  }

  interface Cart {
    id: string;
    attributes: {
      products: CartProduct[];
    };
    opened: boolean;
  }
}
