import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import MDEditor from '@uiw/react-md-editor';

import outsideClick from '../../../../hooks/OutsideClick';

import { updateProject } from '../../store/projects-actions';

import classes from './Note.module.css';

const Note = () => {

  const { project } = useSelector(state => state.projects);

  const dispatch = useDispatch();

  const [currentValue, setCurrentValue] = useState('');

  const [isPreview, setIsPreview] = useState(true);

  const actionsRef = useRef(null);
  const isMounted = useRef(true);

  const textareaRef = useRef();

  useEffect(() => {
    if (project) {
      if (isMounted.current) {
        if (!project.note) {
          actionsRef.current.click();
        }
        setCurrentValue(project.note);
      }
    }
  }, [project])

  const onCloseDropdown = () => {
    if (project.note || currentValue) {
      setIsPreview(true);
    }
  }

  outsideClick({ actionsRef, onCloseDropdown })

  const onChangeClientNoteHandler = useCallback(e => {
    e.target.style.height = "inherit";
    e.target.style.height = `${e.target.scrollHeight}px`;
    setCurrentValue(e.target.value)
  }, []);

  const onClickToEdit = () => {
    const valueLength = currentValue.length;
    if (isPreview) {
      setIsPreview(false);
      setTimeout(() => {
        textareaRef.current.focus();
        textareaRef.current.setSelectionRange(valueLength, valueLength);
        textareaRef.current.style.height = 'inherit';
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        textareaRef.current.style.opacity = 1;
      })
    }
  }

  const onBlurHandler = () => {
    if (currentValue !== project.note) {
      dispatch(updateProject({
        dataToUpdate: { note: currentValue },
        workspaceId: project.workspaceId,
        id: project.id
      }))
    }
  }

  return (
    <div className={classes.textareaWrapper} ref={actionsRef} onClick={onClickToEdit}>
      {!isPreview ?
        <textarea
          onBlur={onBlurHandler}
          ref={textareaRef}
          placeholder='Add note...'
          value={currentValue}
          onChange={onChangeClientNoteHandler}/>
        :
        <MDEditor.Markdown
          className={classes.markdown}
          source={currentValue}
          linkTarget="_blank"/>
      }
    </div>
  )
};

export default Note
