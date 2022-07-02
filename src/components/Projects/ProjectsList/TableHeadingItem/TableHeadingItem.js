import { useCallback, useMemo } from 'react';
import { useLocation } from 'react-router-dom';

import CustomTableHeadingItem from '../../../UI/CustomTableHeadingItem/CustomTableHeadingItem';

import { theadData } from './theadData/thead-data';

const TableHeadingItem = props => {

  const { clickSortItem } = props;

  const { search } = useLocation();

  const queryParams = useMemo(() => new URLSearchParams(search), [search]);
  const sortColumn = queryParams.get('sort-column');
  const sortOrder = queryParams.get('sort-order');

  const onClickSortItem = useCallback(data => {
    clickSortItem(data)
  }, [clickSortItem])

  return (<CustomTableHeadingItem data={theadData} clickSortItem={onClickSortItem} sortColumn={sortColumn}
                                  sortOrder={sortOrder}/>)
};

export default TableHeadingItem;
