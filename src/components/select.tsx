import { cn } from '@/utils/cn';

type SelectProps = React.DetailedHTMLProps<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
>;
const Select = (props: SelectProps) => {
  const { children, className } = props;

  return (
    <select
      {...props}
      className={cn(
        'appearance-none w-full block py-2.5 border-white border bg-white/20 px-3 text-white outline-none transition',
        'invalid:text-zinc-400 focus:ring-2 focus:bg-zinc-400/50',
        className
      )}
    >
      {children}
    </select>
  );
};

export default Select;
