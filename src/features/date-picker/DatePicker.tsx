import { useEffect, useId, useState, type ChangeEventHandler } from 'react';
import { format, isValid, parse, setHours, setMinutes } from 'date-fns';

import { DayPicker } from 'react-day-picker';
import 'react-day-picker/style.css';

const DatePicker = ({
  initialDate,
  setDateSelected,
}: {
  initialDate?: Date;
  setDateSelected?: (val: Date | undefined) => any;
}) => {
  const inputId = useId();
  const [selected, setSelected] = useState<Date | undefined>(initialDate);
  const [month, setMonth] = useState(new Date());

  const [inputValue, setInputValue] = useState(format(initialDate ?? new Date(), 'MM/dd/yy'));
  const [timeValue, setTimeValue] = useState<string>(format(initialDate ?? new Date(), 'hh:mm'));

  const updateSelected = (val: Date | undefined) => {
    setSelected(val);

    if (setDateSelected) {
      setDateSelected(val);
    }
  };

  const handleTimeChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const time = e.target.value;
    if (!selected) {
      setTimeValue(time);
      return;
    }
    let [hours, minutes] = time.split(':').map((str) => parseInt(str, 10));
    if (time) {
      [hours, minutes] = time.split(':').map((str) => parseInt(str, 10));
    } else {
      [hours, minutes] = [0, 0];
    }
    const newSelectedDate = setHours(setMinutes(selected, minutes), hours);
    updateSelected(newSelectedDate);
    setTimeValue(time);
  };

  const handleDaySelect = (date: Date | undefined) => {
    if (!timeValue || !date) {
      updateSelected(date);
      return;
    }
    const [hours, minutes] = timeValue.split(':').map((str) => parseInt(str, 10));
    const newDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), hours, minutes);
    const newInputValue = format(newDate, 'MM/dd/yyyy');
    updateSelected(newDate);
    setMonth(newDate);
    setInputValue(newInputValue);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value); // Keep the input value in sync

    const parsedDate = parse(e.target.value, 'MM/dd/yyyy', new Date());

    if (isValid(parsedDate)) {
      updateSelected(parsedDate);
      setMonth(parsedDate);
    } else {
      updateSelected(undefined);
    }
  };

  return (
    <div className="w-full">
      <div className="mb-4 flex flex-row gap-2">
        {/* <label htmlFor={inputId} className="font-normal">
          Date/Time:
        </label> */}
        <input
          style={{ fontSize: 'inherit' }}
          id={inputId}
          type="text"
          value={inputValue}
          placeholder="mm/dd/yyyy"
          className="border-ink-400 w-32 rounded-md border-1 px-2"
          onChange={handleInputChange}
        />
        <input
          type="time"
          value={timeValue}
          className="border-ink-400 w-32 rounded-md border-1 px-2"
          onChange={handleTimeChange}
        />
      </div>
      <DayPicker
        month={month}
        onMonthChange={setMonth}
        mode="single"
        selected={selected}
        onSelect={handleDaySelect}
        footer={selected ? `Selected: ${format(selected, 'dd/MM/yy (K:mm bbb)')}` : 'Select a day'}
        classNames={{
          root: 'relative w-full',
          months: 'w-full',
          month_grid: 'mt-4 w-full table-fixed',
          week: 'h-10',
          day: 'aspect-square relative',
          day_button: 'w-full text-center h-full cursor-pointer',
          // focused:
          //   'rounded-full font-bold after:h-10 after:aspect-square after:border-2 after:border-accent-600 after:absolute after:rounded-full after:left-1/2 after:top-1/2 after:-translate-1/2',
          selected:
            'rounded-full font-bold after:h-10 after:aspect-square after:border-2 after:border-accent-200 after:absolute after:rounded-full after:left-1/2 after:top-1/2 after:-translate-1/2',
          footer: 'text-ink-400',
        }}
      />
    </div>
  );
};

export default DatePicker;
