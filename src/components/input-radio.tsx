import { cn } from '@/utils/cn';
import * as React from 'react';

type Props = React.InputHTMLAttributes<HTMLInputElement & { type: 'radio' }> & {
  children: React.ReactNode;
};

const InputRadio = ({ children, ...props }: Props) => {
  return (
    <label className="flex items-center space-x-4 py-2">
      <input
        className={cn(
          'appearance-none bg-white/50 text-white/75 w-4 h-4 border-white grid items-center justify-center shrink-0 cursor-pointer rounded-[50%] border-[0.1rem] border-solid',
          'checked:before:scale-100',
          'before:content-[""] before:w-2 before:h-2 before:transition-[120ms] before:duration-[transform] before:ease-[ease-in-out] before:bg-red-600 before:rounded-[50%] before:scale-0'
        )}
        type="radio"
        {...props}
      />
      <span className="w-[90%] flex-none cursor-pointer text-left">{children}</span>
    </label>
  );
};

export default InputRadio;
