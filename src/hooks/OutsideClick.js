import { useEffect } from "react";

const useOutsideClick = props => {

  const {actionsRef: ref, onCloseDropdown} = props;

  useEffect(() => {
    const handleClickOutside = event => {
      if (ref.current && !ref.current.contains(event.target)) {
        onCloseDropdown()
      }
    }
    document.addEventListener("mouseup", handleClickOutside);
    return () => {
      document.removeEventListener("mouseup", handleClickOutside);
    };
  }, [ref, onCloseDropdown]);
}

export default useOutsideClick;
