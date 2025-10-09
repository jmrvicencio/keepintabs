import { ChangeEvent, useState } from 'react';

const useDigitField = () => {
  const [value, setValue] = useState<string>('0.00');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    let currentVal: string = e.target.value;

    // field cant be empty so we need to put a placeholder of 0.00
    if (currentVal.length < 0) currentVal = '0.00';
    const isOnlyDigits = /^(\d|\,|\.)+$/.test(currentVal);
    if (!isOnlyDigits) return;

    currentVal = currentVal.replaceAll(',', '').replaceAll('.', '');
    const formatted = new Intl.NumberFormat('en-US', {
      style: 'decimal',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(Number(currentVal) * 0.01);

    setValue(formatted);
  };

  return {
    value,
    handleChange,
  };
};

export default useDigitField;
