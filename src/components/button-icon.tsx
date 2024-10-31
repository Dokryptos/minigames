import { cn } from '@/utils/cn';
import { Icon } from '@iconify-icon/react';

type ButtonIconProps = {
  className?: string;
  icon: string;
  onPress: () => void;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;
const ButtonIcon = ({ className, icon, onPress, ...rest }: ButtonIconProps) => {
  return (
    <button
      type="button"
      {...rest}
      onClick={onPress}
      className={cn(
        'flex size-8 items-center justify-center rounded-sm bg-zinc-800 shadow-lg shadow-black/30 transition',
        'hover:bg-zinc-800/80',
        className
      )}
    >
      <Icon icon={icon} className="size-4 text-white" />
    </button>
  );
};

export default ButtonIcon;
