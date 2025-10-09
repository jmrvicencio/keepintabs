import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import useDigitField from '../../src/hooks/useDigitField';
import { ChangeEvent } from 'react';
const mockChange = (value: string) => {
  return { currentTarget: { value }, target: { value } } as ChangeEvent<HTMLInputElement>;
};

describe('Input Field Hooks', async () => {
  it('digit field updates corrects properly', async () => {
    const { result } = renderHook(() => useDigitField());
    const emptyField = mockChange('');

    act(() => result.current.handleChange(emptyField));
    expect(result.current.value).toBe('0.00');
  });
  it('digit field updates corrects properly', async () => {
    const { result } = renderHook(() => useDigitField());
    const singleDigit = mockChange('2');
    const updatedDigit = mockChange('0.020000');
    const millionDigit = mockChange('2,000,000.00');

    act(() => result.current.handleChange(singleDigit));
    expect(result.current.value).toBe('0.02');
    act(() => result.current.handleChange(updatedDigit));
    expect(result.current.value).toBe('200.00');
    act(() => result.current.handleChange(millionDigit));
    expect(result.current.value).toBe('2,000,000.00');
  });
});
