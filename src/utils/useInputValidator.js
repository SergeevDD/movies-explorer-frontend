import { useState } from "react";

const useInputValdator = (initialValue) => {


  const [value, setValue] = useState(initialValue);
  const [validity, setValidity] = useState(false);
  const [validateMsg, setValidateMsg] = useState('');
  const [isCanged, setIsChanged] = useState(false);

  function handleChangeValue(e) {
    setValue(e.target.value);
    setValidity(e.target.validity.valid);
    setValidateMsg(e.target.validationMessage);
    if (!isCanged) {
      setIsChanged(true);
    }
  }

  function handleSetValid() {
    setValidity(true);
  }

  return {
    value,
    validity,
    validateMsg,
    isCanged,
    handleChangeValue,
    handleSetValid,

  }
}
export default useInputValdator;

