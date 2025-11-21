import { ChangeEvent, useEffect, useState } from 'react';

export interface DigitField {
  value: string;
  setValue: (val: string) => any;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => string | undefined | null;
}

export const formatValue = (initialVal: string | number): string => {
  let val: string = typeof initialVal == 'string' ? initialVal : `${initialVal}`;
  val = val.replaceAll(',', '').replaceAll('.', '');
  const formatted = new Intl.NumberFormat('en-US', {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Number(val) * 0.01);

  return formatted;
};

const useDigitField = (initialVal: string = '0.00'): DigitField => {
  const [value, setValue] = useState<string>(formatValue(initialVal));

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    let currentVal: string = e.target.value;

    // field cant be empty so we need to put a placeholder of 0.00
    if (currentVal.length <= 0) currentVal = '0.00';
    const isOnlyDigits = /^(\d|\,|\.)+$/.test(currentVal);
    if (!isOnlyDigits) return;

    const formattedVal = formatValue(currentVal);

    setValue(formattedVal);
    return formattedVal;
  };

  const _setValue = (val: string) => {
    // field cant be empty so we need to put a placeholder of 0.00
    if (val.length <= 0) val = '0.00';
    const isOnlyDigits = /^(\d|\,|\.)+$/.test(val);
    if (!isOnlyDigits) return;

    const formattedVal = formatValue(val);
    setValue(formattedVal);
  };

  return {
    value,
    setValue: _setValue,
    handleChange,
  };
};

export default useDigitField;
