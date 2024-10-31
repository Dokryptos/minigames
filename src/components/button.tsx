import { cn } from '@/utils/cn';

const colorsByVariant = {
  primary: cn(
    'bg-gradient-to-r from-[#aa050e] to-[#e7424b]',
    'hover:brightness-110',
    'disabled:opacity-30 disabled:cursor-default disabled:brightness-100 disabled:cursor-not-allowed'
  ),
  secondary:
    'bg-white/20 hover:bg-white/40 disabled:opacity-30 disabled:cursor-default disabled:bg-white/20 disabled:cursor-not-allowed',
};

interface ButtonValidateProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  type?: 'submit' | 'button';
  variant?: 'primary' | 'secondary';
}
const Button = (props: ButtonValidateProps) => {
  const { children, type, variant = 'primary', className, ...rest } = props;

  return (
    <button
      {...rest}
      type={type || 'button'}
      className={cn(
        'shrink-0 h-14 flex items-center justify-center text-white px-8 uppercase font-semibold transition rounded-sm font-din',

        colorsByVariant[variant],
        className
      )}
    >
      {children}
    </button>
  );
};

export default Button;
