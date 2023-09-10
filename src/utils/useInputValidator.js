import { useState } from "react";

const useInputValdator = (initialValue) => {

  const [value, setValue] = useState(initialValue);
  const [validity, setValidity] = useState(true);
  const [validateMsg, setValidateMsg] = useState('');

  function handleChangeValue(e) {
    setValue(e.target.value);
    setValidity(e.target.validity.valid);
    setValidateMsg(e.target.validationMessage);
  }

  return {
    value,
    validity,
    validateMsg,
    handleChangeValue,
  }
}
export default useInputValdator;

