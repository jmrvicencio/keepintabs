import { ChangeEvent, useState } from 'react';

const useInputField = (initialString = '') => {
  const [value, setValue] = useState<string>(initialString);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  };

  return {
    value,
    handleChange,
  };
};

export default useInputField;
