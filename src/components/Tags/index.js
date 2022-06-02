import { Fragment } from 'react';

import TagsActions from './TagsActions/TagsActions';
import TagsList from './TagsList/TagsList';

const Tags = () => {
  return (
    <Fragment>
      <TagsActions/>
      <TagsList/>
    </Fragment>
  )
};

export default Tags;
