import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';

import ReadonlyInputWithSetButton from '../../../../UI/ReadonlyInputWithSetButton/ReadonlyInputWithSetButton';
import BillableRateModal from '../../../../UI/BillableRateModal/BillableRateModal';

import { updateProject } from '../../../store/projects-actions';

const ProjectBillableRate = props => {

  const dispatch = useDispatch();

  const { className, settingsTitle, settingsSubTitle, project } = props;
  const { hourlyRate, workspaceId, id: projectId } = project;
  const { amount: hourlyRateAmount } = hourlyRate;

  const [showModal, setShowModal] = useState(false);
  const [rateVal, setRateVal] = useState(0);
  const [isDisabled, setIsDisabled] = useState(true);

  const onClickRateButtonHandler = useCallback(() => {
    setShowModal(true);
  }, []);

  const onHideModalHandler = useCallback(() => {
    setShowModal(false)
  }, []);

  const onChangeRateValueHandler = useCallback(val => {

    if (hourlyRateAmount / 100 !== +val) {
      setIsDisabled(false)
      setRateVal(val);
    } else {
      setIsDisabled(true)
    }
  }, [hourlyRateAmount]);

  const onSubmitBillableRateHandler = useCallback(() => {
    let val = '';
    if (rateVal.includes('.')) {
      const rateValDecimal = rateVal.substring(rateVal?.indexOf('.') + 1);
      if (rateValDecimal.length === 1) {
        val = `${rateVal.replaceAll('.', '')}0`
      } else {
        val = rateVal.replaceAll('.', '')
      }
    } else {
      val = `${rateVal}00`;
    }
    dispatch(updateProject({
      dataToUpdate: { ...project, isPublic: project.public, hourlyRate: { amount: +val } },
      workspaceId: workspaceId,
      id: projectId
    }))
    setShowModal(false)
  }, [dispatch, project, projectId, rateVal, workspaceId])

  return (
    <div className={`${className ? className : ''}`}>
      <p className={`${settingsTitle ? settingsTitle : ''}`}>Project billable rate</p>
      <p className={`${settingsSubTitle ? settingsSubTitle : ''}`}>Billable rate used for calculating billable amount
        for this project.</p>
      <ReadonlyInputWithSetButton
        onClickSetChange={onClickRateButtonHandler}
        amount={hourlyRateAmount}
        label='Hourly rate (USD)'/>
      <BillableRateModal
        showModal={showModal}
        onHideModal={onHideModalHandler}
        amount={hourlyRateAmount}
        isDisabled={isDisabled}
        onSubmitFormBillableRate={onSubmitBillableRateHandler}
        infoMessage="We'll apply this rate to all entries on this project, unless some member has a more specific rate for this project."
        onChangeRateValue={onChangeRateValueHandler}
      />
    </div>
  )

};

export default ProjectBillableRate;
