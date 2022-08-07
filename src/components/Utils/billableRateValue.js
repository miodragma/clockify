export const billableRateValue = (rateVal) => {
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

  return val;
};
