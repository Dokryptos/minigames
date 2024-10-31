import { cn } from '@/utils/cn';
import * as React from 'react';
import Image from './image';
import redCheck from '@/assets/img/red-check.png?lqip';

type Props = React.InputHTMLAttributes<HTMLInputElement & { type: 'checkbox' }> & {
  children: React.ReactNode;
};

const InputCheckbox = ({ children, ...props }: Props) => {
  return (
    <label className="relative flex items-center gap-4 py-2">
      <input
        className={cn(
          'appearance-none peer bg-white/30 text-white w-4 h-4 border-white/75 grid items-center justify-center shrink-0 cursor-pointer rounded-sm border-[0.1rem] border-solid',
          'before:w-2.5 before:h-2.5 before:transition-[20ms] before:ease-in-out before:bg-[white] before:opacity-0',
          'checked:before:opacity-100'
        )}
        type="checkbox"
        {...props}
      />
      <Image
        {...redCheck}
        alt="check"
        className="absolute left-0 top-1/2 size-6 translate-y-[calc(-50%_-_0.5rem)] opacity-0 peer-checked:opacity-100"
      />
      <span className="w-[90%] flex-none cursor-pointer text-left">{children}</span>
    </label>
  );
};

export default InputCheckbox;
