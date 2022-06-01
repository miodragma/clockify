import { useEffect } from "react";

const useOutsideClick = (props) => {

  const {actionsRef: ref, onCloseActions} = props;

  useEffect(() => {
    const handleClickOutside = event => {
      if (ref.current && !ref.current.contains(event.target)) {
        onCloseActions()
      }
    }
    document.addEventListener("mouseup", handleClickOutside);
    return () => {
      document.removeEventListener("mouseup", handleClickOutside);
    };
  }, [ref, onCloseActions]);
}

export default useOutsideClick;
