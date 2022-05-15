export const sortProducts = (
  sortBy: string,
  products: SimpleProduct[]
): SimpleProduct[] => {
  return products.sort((a, b) => {
    const aPrice = a.attributes.promotionPrice || a.attributes.price;
    const bPrice = b.attributes.promotionPrice || b.attributes.price;

    switch (sortBy) {
      case 'low':
        return aPrice - bPrice;
      case 'high':
        return bPrice - aPrice;
      case 'A':
        return a.attributes.name.localeCompare(b.attributes.name);
      case 'Z':
        return b.attributes.name.localeCompare(a.attributes.name);
      default:
        return 0;
    }
  });
};
