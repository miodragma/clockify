import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import TagsListHeader from '../TagsListHeader/TagsListHeader';
import ListItem from '../../Services/ListItem/ListItem';
import TagsEdit from '../TagsEdit/TagsEdit';
import ModalWrapper from '../../UI/ModalWrapper/ModalWrapper';

import { deleteTag, updateTag } from '../store/tags-actions';

import classes from './TagsList.module.css';

const initialState = {
  name: ''
}

const TagsList = () => {

  const dispatch = useDispatch();

  const filterTags = useSelector(state => state.tags.filterTags);
  const {activeWorkspace} = useSelector(state => state.user.user);

  const [showEditModal, setShowEditModal] = useState(false);
  const [editTagData, setEditTagData] = useState(initialState)

  const [showActionModal, setShowActionModal] = useState(false);
  const [actionModalTitle, setActionModalTitle] = useState('');
  const [actionTag, setActionTag] = useState({});

  const {name} = actionTag;

  const onTagsItemActionHandler = useCallback((action, tag) => {
    setActionModalTitle(action)
    setActionTag(tag);
    setShowActionModal(true)
  }, [])

  const onClickEditHandler = useCallback(tag => {
    setEditTagData(tag);
    setShowEditModal(true);
  }, [])

  const tags = filterTags.map(client => {
    return <ListItem
      type='tags'
      key={client.id}
      data={client}
      onItemAction={(action) => onTagsItemActionHandler(action, client)}
      onClickEdit={() => onClickEditHandler(client)}/>
  })

  const onHideEditModalHandler = () => {
    setShowEditModal(false);
    setEditTagData(initialState);
  };

  const submitEditTagHandler = useCallback(tagData => {
    const {tagId, ...dataToUpdate} = tagData;
    dispatch(updateTag({dataToUpdate, tagId, workspaceId: activeWorkspace}));
  }, [activeWorkspace, dispatch]);

  const onHideActionModalHandler = () => {
    setShowActionModal(false);
  }

  const submitActionModalHandler = () => {
    const {id: tagId, workspaceId, ...tagData} = actionTag;
    if (actionModalTitle === 'Archive' || actionModalTitle === 'Restore') {
      const dataToUpdate = {...tagData, archived: actionModalTitle === 'Archive'};
      dispatch(updateTag({dataToUpdate, tagId, workspaceId}));
    } else {
      dispatch(deleteTag({tagId, workspaceId}))
    }
    onHideActionModalHandler()
  };

  let actionBody;
  if (actionModalTitle && showActionModal && name) {
    const actionsBody = {
      archive: <p className={classes.actionModalParagraph}>Are you sure you want to archive {name}?</p>,
      restore: <p className={classes.actionModalParagraph}>Are you sure you want to restore {name}?</p>,
      delete: <div>
        <p className={classes.actionModalParagraph}>Are you sure you want to delete {name}?</p>
        <p className={classes.actionModalMessage}>The {name} will also be removed from all time entries it is assigned
          to. This action cannot be reversed.</p>
      </div>
    }
    actionBody = (actionsBody[actionModalTitle.toLowerCase()])
  }

  return (
    <section className={classes.section}>
      <TagsListHeader/>
      {tags}
      <TagsEdit
        onHide={onHideEditModalHandler}
        show={showEditModal}
        tag={editTagData}
        submitEditTag={submitEditTagHandler}/>
      <ModalWrapper
        show={showActionModal}
        onHide={onHideActionModalHandler}
        title={actionModalTitle}
        buttonTitle={actionModalTitle}
        className={'warning'}
        onClickSubmitButton={submitActionModalHandler}>
        {actionBody}
      </ModalWrapper>
    </section>
  )
};

export default TagsList;
