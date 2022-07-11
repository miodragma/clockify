import { useEffect, useRef, useState } from 'react'

import { SketchPicker } from 'react-color';

import { generateRandomRgb } from '../../Utils/generateRandomRgb';
import { hexToRgba } from '../../Utils/hexToRgba';

import classes from './ColorPicker.module.css';

const initialState = generateRandomRgb;

const ColorPicker = props => {

  const { changeColor, currentColor } = props;

  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [color, setColor] = useState(initialState);
  const [hexColor, setHexColor] = useState();
  const isMounted = useRef(true);

  useEffect(() => {
    if (isMounted.current) {
      if (!currentColor) {
        changeColor(color)
      } else {
        setColor(hexToRgba(currentColor))
      }
      isMounted.current = false
    }
  }, [changeColor, color, currentColor])

  const handleClick = () => {
    setDisplayColorPicker(!displayColorPicker)
  };

  const handleClose = () => {
    setDisplayColorPicker(false);
    changeColor(hexColor);
  };

  const handleChange = color => {
    setColor(color.rgb);
    setHexColor(color.hex)
  };

  return (
    <div>
      <div className={`${classes.swatch} ${classes.colorWrapper}`} onClick={handleClick}>
        <div style={{background: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`}} className={classes.color}/>
        <div className={classes.dropdownCaretWrapper}>
          <i className={classes.dropdownCaret}/>
        </div>
      </div>
      {displayColorPicker ? <div className={classes.popover}>
        <div className={classes.cover} onClick={handleClose}/>
        <SketchPicker color={color} onChange={handleChange}/>
      </div> : null}

    </div>
  )
}

export default ColorPicker;
