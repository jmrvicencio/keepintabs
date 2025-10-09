import { ChangeEvent, useState } from 'react';

const useInputField = () => {
  const [value, setValue] = useState<string>('0.00');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  };

  return {
    value,
    handleChange,
  };
};

export default useInputField;
