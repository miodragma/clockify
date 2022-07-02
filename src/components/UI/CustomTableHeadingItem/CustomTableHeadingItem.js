import { Fragment } from 'react';

import classes from './CustomTableHeadingItem.module.css';

const CustomTableHeadingItem = props => {

  const { data, sortColumn, sortOrder, clickSortItem } = props;

  const onClickSortItem = item => {
    clickSortItem(item)
  };

  const item = data.map(item => {
    let activeClass;
    if (item.value === sortColumn) {
      activeClass = `active${sortOrder.toLowerCase().charAt(0).toUpperCase() + sortOrder.toLowerCase().slice(1)}`
    }

    let theadItem;

    if (item.value) {
      theadItem = <Fragment>
        <p className={`${classes.theadLabel} ${classes.theadLabelSort}`}
           onClick={() => onClickSortItem({ item, sortColumn, sortOrder })}>{item.label}</p>
        <div className={classes.sortByWrapper}>
          <i className={`${classes.sortByAsc} ${sortOrder === 'ASCENDING' ? classes[activeClass] : ''}`}/>
          <i className={`${classes.sortByDesc} ${sortOrder === 'DESCENDING' ? classes[activeClass] : ''}`}/>
        </div>
      </Fragment>
    } else {
      theadItem = <p className={classes.theadLabel} style={{ display: item.display }}>{item.label}</p>
    }

    return <th className={classes.th} key={item.label}>
      <div className={classes.theadWrapper}>
        {theadItem}
      </div>
    </th>
  })

  return (item)

};

export default CustomTableHeadingItem;
