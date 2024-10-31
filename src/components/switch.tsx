import { Switch as HUISwitch } from '@headlessui/react';
import { cn } from '@/utils/cn';

type SwitchProps = {
  checked: boolean;
  onChange: () => void;
  className?: string;
};
const Switch = ({ checked, onChange, className }: SwitchProps) => {
  return (
    <HUISwitch
      as="div"
      checked={checked}
      onChange={onChange}
      className={cn(
        checked ? 'bg-red-600' : 'bg-zinc-600',
        `relative inline-flex h-3.5 items-center w-6 shrink-0 cursor-pointer rounded-[4px] border-2 border-transparent transition-colors duration-200 ease-in-out`,
        'focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75',
        className
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          checked ? 'translate-x-[10px]' : 'translate-x-[2px]',
          `pointer-events-none inline-block h-2 w-2 transform rounded-sm bg-white shadow-lg ring-0 transition duration-200 ease-in-out`
        )}
      />
    </HUISwitch>
  );
};

export default Switch;
