import { ChangeEvent, useState } from 'react';

export interface InputField {
  value: string;
  setValue: (val: string) => any;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => any;
}

const useInputField = (initialString = ''): InputField => {
  const [value, setValue] = useState<string>(initialString);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  };

  return {
    value,
    setValue,
    handleChange,
  };
};

export default useInputField;
