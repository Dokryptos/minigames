import { cn } from '@/utils/cn';
import { Menu as HUIMenu, Transition } from '@headlessui/react';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify-icon/react';

const classesByPosition = {
  left: 'left-0',
  right: 'right-0',
} as const;

interface MenuProps {
  anchor?: React.ReactNode;
  className?: ({ open }: { open: boolean }) => string;
  children: React.ReactNode | React.ReactNode[];
  position?: keyof typeof classesByPosition;
}
const Menu = (props: MenuProps) => {
  const { anchor, children, className, position } = props;

  return (
    <HUIMenu as="div" className="relative inline-block text-left">
      {({ open }) => (
        <>
          <HUIMenu.Button
            className={
              className?.({ open }) ||
              cn(
                'text-white flex gap-2 p-2 rounded transition',
                open ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-700 hover:bg-gray-600'
              )
            }
          >
            {anchor || (
              <>
                <Icon icon="lucide:settings" className="size-4" />
                <Icon icon="lucide:chevron-down" className="size-4" />
              </>
            )}
          </HUIMenu.Button>

          <Transition
            as={React.Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <HUIMenu.Items
              className={cn(
                'absolute z-50 mt-2 flex w-40 origin-top-right flex-col overflow-hidden rounded-sm bg-white p-2 text-left text-gray-900 shadow-lg focus:outline-none',
                classesByPosition[position || 'right']
              )}
            >
              {React.Children.map(children, (child) => (
                <HUIMenu.Item>{child}</HUIMenu.Item>
              ))}
            </HUIMenu.Items>
          </Transition>
        </>
      )}
    </HUIMenu>
  );
};

type MenuItemProps =
  | {
      children: React.ReactNode;
      className?: string;
      onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
      target?: undefined;
      to?: undefined;
    }
  | {
      children: React.ReactNode;
      className?: string;
      onClick?: undefined;
      to: string;
      target?: string;
    };
const MenuItem = React.forwardRef<HTMLAnchorElement | HTMLButtonElement, MenuItemProps>(
  ({ children, className, onClick, target, to }, ref) => {
    const classes = cn(
      'flex h-9 items-center px-4 text-left text-sm font-semibold text-gray-900 hover:bg-gray-100',
      className
    );

    if (to) {
      return (
        <Link className={classes} to={to} target={target} ref={ref as React.Ref<HTMLAnchorElement>}>
          {children}
        </Link>
      );
    }

    return (
      <button
        className={classes}
        onClick={onClick}
        type="button"
        ref={ref as React.Ref<HTMLButtonElement>}
      >
        {children}
      </button>
    );
  }
);

Menu.Item = MenuItem;

export default Menu;
