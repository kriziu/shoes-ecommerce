import { useDebounce } from 'react-use';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { filterAtom } from '../recoil/filter/filter.atom';
import productListAtom from '../recoil/productList';
import { commerceJS } from './commerce';

const FilterSynchronizer = () => {
  const filter = useRecoilValue(filterAtom);

  const setProductList = useSetRecoilState(productListAtom);

  useDebounce(
    () => {
      setProductList((prev) => ({ ...prev, loading: true }));
      commerceJS.products
        .list()
        .then((res) => setProductList({ products: res.data, loading: false }));
    },
    800,
    [filter]
  );

  return null;
};

export default FilterSynchronizer;
