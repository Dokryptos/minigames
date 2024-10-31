import { cn } from '@/utils/cn';

interface FilterProps {
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
}
const ButtonFilter = ({ children, active, onClick }: FilterProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'p-4 font-fixture text-white border tracking-wider bg-transparent border-white uppercase flex items-center gap-2 font-semibold opacity-75 transition duration-200 hover:opacity-100',
        active && 'opacity-100 bg-white/20'
      )}
    >
      {children}
    </button>
  );
};

export default ButtonFilter;
