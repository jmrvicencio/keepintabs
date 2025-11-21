import { ChangeEvent, useState } from 'react';

export interface InputField {
  value: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => any;
}

const useInputField = (initialString = ''): InputField => {
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
