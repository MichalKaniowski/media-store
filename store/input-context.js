import React, { useState, useMemo } from "react";

const InputContext = React.createContext({
  value: "",
  changeValue: (newValue) => {},
});

export function InputContextProvider(props) {
  const [inputValue, setInputValue] = useState("");

  function changeValueHandler(newValue) {
    setInputValue(newValue);
  }

  const contextValue = useMemo(
    () => ({ value: inputValue, changeValue: changeValueHandler }),
    [inputValue]
  );

  return (
    <InputContext.Provider value={contextValue}>
      {props.children}
    </InputContext.Provider>
  );
}

export default InputContext;
