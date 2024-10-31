import { cn } from '@/utils/cn';
import { forwardRef } from 'react';

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;
const Input = forwardRef<HTMLInputElement, InputProps>((props: InputProps, ref) => {
  const { className, ...rest } = props;

  return (
    <input
      {...rest}
      className={cn(
        'block py-2 w-full px-3 bg-white/20 border border-white transition text-white',
        'placeholder-shown:invalid:border-white  invalid:border-red-500',
        'focus:bg-zinc-700/50 focus:outline-none focus:border-zinc-100/80',
        className
      )}
      ref={ref}
    />
  );
});

export default Input;
