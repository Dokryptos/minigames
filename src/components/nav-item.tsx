import { NavLink } from 'react-router-dom';
import { Icon } from '@iconify-icon/react';
import { cn } from '@/utils/cn';

interface NavItemProps {
  icon: string;
  onClick?: () => void;
  title: string;
  titleRight?: React.ReactNode;
  link: string;
}
const NavItem = ({ icon, onClick, title, link, titleRight }: NavItemProps) => {
  return (
    <NavLink
      end
      className="group relative h-12 overflow-hidden px-0.5 pt-0.5"
      to={link}
      title={title}
      onClick={onClick}
    >
      {/* gradient border animated */}
      <div
        className={cn(
          'absolute left-0 top-0 -z-10 size-full -translate-y-full opacity-0',
          'bg-gradient-to-b from-red-800 to-zinc-800',
          'transition duration-500 ease-in-out',
          'group-hover:-translate-y-0 group-[&.active]:translate-y-0 group-hover:opacity-100 group-[&.active]:opacity-100'
        )}
      />

      {/* hidden content for spacing and sizing */}
      <div className="flex h-full items-center justify-center bg-zinc-800 pl-16 pr-14 max-sm:w-16 max-sm:px-0">
        <p className="truncate text-lg font-bold text-transparent max-sm:hidden">{title}</p>
      </div>

      {/* backdrop shadow */}
      <div
        className={cn(
          'absolute left-0 top-0 size-full',
          'bg-gradient-to-b from-transparent to-zinc-950 opacity-100',
          'transition-opacity',
          'group-hover:opacity-85 group-[&.active]:opacity-0'
        )}
      />

      {/* content on top */}
      <div className="absolute left-0 top-0 z-10 flex size-full items-center justify-center pl-16 pr-14 max-sm:p-0">
        <div className="relative text-lg font-bold text-white/50 transition delay-200 duration-700 group-[&.active]:text-white">
          <Icon
            icon={icon}
            className="absolute top-1/2 size-6 -translate-x-2 -translate-y-1/2 text-[1.5rem] text-white/50 max-sm:left-1/2 max-sm:-translate-x-1/2 sm:right-full"
          />
          <span className="truncate max-sm:hidden">{title}</span>
          {titleRight && (
            <div className="absolute bottom-full left-full sm:bottom-1/2 sm:left-full sm:translate-x-2 sm:translate-y-1/2">
              {titleRight}
            </div>
          )}
        </div>
      </div>
    </NavLink>
  );
};

export default NavItem;
