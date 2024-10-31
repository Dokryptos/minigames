import React, { useRef, useState } from 'react';
import Input from './input';

type InputWithAutocompleteProps = {
  values: string[];
  inputRef?: React.RefObject<HTMLInputElement>;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const InputWithAutocomplete = ({ values, inputRef: parentInputRef, ...props }: InputWithAutocompleteProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [filteredValues, setFilteredValues] = useState<string[]>([]);

  const handleFocus = () => {
    setIsFocused(true);
    setFilteredValues(values);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    props.onChange?.({ target: { value: newValue } } as React.ChangeEvent<HTMLInputElement>);
    setFilteredValues(
      values.filter(value => value.toLowerCase().includes(newValue.toLowerCase()))
    );
  };

  const innerInputRef = useRef<HTMLInputElement>(null);
  const inputRef = parentInputRef || innerInputRef;

  const handleSelect = (value: string) => {
    if (!inputRef.current) {
      return;
    }

    inputRef.current.value = value;
    props.onChange?.({ target: { value } } as React.ChangeEvent<HTMLInputElement>);
    setIsFocused(false);
  };

  return (
    <div className="relative">
      <Input
        {...props}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
        ref={inputRef}
      />
      {isFocused && filteredValues.length > 0 && (
        <ul className="absolute z-10 mt-1 max-h-40 w-full overflow-y-auto border border-gray-300 bg-zinc-800 shadow-lg">
          {filteredValues.map((value, index) => (
            <li
              key={index}
              className="cursor-pointer px-3 py-2 text-white hover:bg-gray-700"
              onMouseDown={() => handleSelect(value)}
            >
              {value}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
