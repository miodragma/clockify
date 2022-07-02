import { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form } from 'react-bootstrap';

import CustomDropdownWrapper from '../../UI/CustomDropdownWrapper/CustomDropdownWrapper';
import ModalWrapper from '../../UI/ModalWrapper/ModalWrapper';
import Input from '../../UI/Input/Input';
import ClientsElement from './ClientsElement/ClientsElement';
import ColorPicker from '../../UI/ColorPicker/ColorPicker';
import RadioButton from '../../UI/RadioButton/RadioButton';

import { rgbToHex } from '../../Utils/rgbToHex';

import { addNewClient } from '../../Clients/store/clients-actions';

import classes from './CreateProject.module.css';
import { addNewProject } from '../store/projects-actions';

const CreateProject = props => {

  const dispatch = useDispatch();

  const {activeWorkspace: workspaceId} = useSelector(state => state.user.user);
  const clients = useSelector(state => state.clients.clients);

  const [showModal, setShowModal] = useState(false);
  const [clientDropdownLabel, setClientDropdownLabel] = useState('Select client');
  const [closeDropdown, setCloseDropdown] = useState(false);
  const [findClientName, setFindClientName] = useState('');

  const [projectName, setProjectName] = useState('');
  const [clientId, setClientId] = useState('');
  const [color, setColor] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [isWithout, setIsWithout] = useState(false);

  const isClientList = useRef(false);

  const keydownHandler = useCallback(e => {
    if (e.keyCode === 13 && e.ctrlKey && findClientName && !isClientList.current) {
      dispatch(addNewClient({workspaceId, name: findClientName}))
    }
  }, [dispatch, findClientName, workspaceId])

  useEffect(() => {
    document.addEventListener('keydown', keydownHandler);
    return () => document.removeEventListener('keydown', keydownHandler)
  }, [keydownHandler])

  const onHideModalHandler = useCallback(() => {
    setProjectName('');
    setClientId('');
    setIsPublic(true);
    setClientDropdownLabel('Select client');
    setShowModal(false);
  }, [])

  const onClickCreateNewProjectHandler = () => {
    setShowModal(true);
  };

  const createNewProjectHandler = useCallback(() => {
    const convertColor = typeof color === 'object' ? rgbToHex(color) : color;
    const projectData = {
      name: projectName,
      clientId: clientId || '',
      billable: true,
      color: convertColor,
      isPublic: isPublic
    }
    dispatch(addNewProject({workspaceId, projectData}));
    onHideModalHandler()
  }, [projectName, clientId, isPublic, color, dispatch, onHideModalHandler, workspaceId])

  const onChangeProjectNameHandler = useCallback(name => {
    setProjectName(name.trim());
  }, [])

  const onClickClientHandler = client => {
    if (client.id !== 'without') {
      setClientId(client.id);
      setClientDropdownLabel(client.name);
      setCloseDropdown(true);
    } else {
      setClientId('');
      setClientDropdownLabel('Select client');
      setCloseDropdown(true);
    }
    setIsWithout(client.id !== 'without');
  }

  const onResetCloseDropdownHandler = useCallback(val => {
    setCloseDropdown(val);
  }, []);

  const onFindClientHandler = useCallback(val => {
    setFindClientName(val)
  }, []);

  const onCreateClientHandler = useCallback(() => {
    dispatch(addNewClient({workspaceId, name: findClientName}));
  }, [dispatch, findClientName, workspaceId]);

  const onIsClientListHandler = useCallback(val => {
    isClientList.current = val;
  }, []);

  const onChangeColorHandler = useCallback(color => {
    setColor(color);
  }, []);

  const onChangePublicHandler = useCallback(() => {
    setIsPublic(!isPublic);
  }, [isPublic]);

  let isDisableCreate = projectName.length <= 2;

  return (
    <Fragment>
      <Button onClick={onClickCreateNewProjectHandler} className={`${classes.createNewProjectButton} primary`}>Create
        new project</Button>
      <ModalWrapper
        buttonTitle='Create'
        show={showModal}
        onHide={onHideModalHandler}
        title='Create new project'
        isDisabledButton={isDisableCreate}
        className={'primary'}
        autoFocus={true}
        onClickSubmitButton={createNewProjectHandler}>
        <Form>
          <div className={classes.formRowWrapper}>
            <Input
              className={classes.projectNameFormField}
              placeholder='Enter project name'
              type='text'
              onChangeInputVal={onChangeProjectNameHandler}
              autofocus={true}/>
            <CustomDropdownWrapper
              className={classes.createProjectCdw}
              label={clientDropdownLabel}
              position={false}
              closeDropdown={closeDropdown}
              onResetCloseDropdown={onResetCloseDropdownHandler}>
              <div className={classes.clientsList}>
                <ClientsElement
                  isWithoutClient={isWithout}
                  clients={clients}
                  findClientName={findClientName}
                  clickClient={onClickClientHandler}
                  isClientList={onIsClientListHandler}
                  findClient={onFindClientHandler}
                  createClient={onCreateClientHandler}
                />
              </div>
            </CustomDropdownWrapper>
          </div>
          <div className={`${classes.formRowWrapper} ${classes.formRowWrapperWithColor}`}>
            <div className={classes.colorAndPublicWrapper}>
              <ColorPicker changeColor={onChangeColorHandler}/>
              <RadioButton
                buttonWrapper={classes.buttonWrapper}
                type='checkbox'
                isChecked={isPublic}
                label='Public'
                changeCheckValue={onChangePublicHandler}/>
            </div>
            <CustomDropdownWrapper
              className={`${classes.createProjectCdw} ${classes.createProjectCdwTemplate}`}
              label='No template'
              position={false}
              closeDropdown={closeDropdown}
              onResetCloseDropdown={onResetCloseDropdownHandler}>
              <div className={classes.popover}>
                <p><span>Upgrade </span>to use templates.</p>
                <div className={classes.popoverArrow}/>
              </div>
            </CustomDropdownWrapper>
          </div>
        </Form>
      </ModalWrapper>
    </Fragment>

  )
};

export default CreateProject;
