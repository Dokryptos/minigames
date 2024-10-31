import * as React from 'react';
import { AriaTooltipProps, useTooltip, useTooltipTrigger } from '@react-aria/tooltip';
import {
  TooltipTriggerProps,
  TooltipTriggerState,
  useTooltipTriggerState,
} from '@react-stately/tooltip';
import { mergeProps } from '@react-aria/utils';
import { cn } from '@/utils/cn';
import { Transition } from '@headlessui/react';

const classesByPosition = {
  top: 'bottom-full left-1/2 transform -translate-x-1/2 -translate-y-2',
  bottom: 'top-full left-1/2 transform -translate-x-1/2 translate-y-2',
  left: 'right-full top-1/2 transform -translate-y-1/2 -translate-x-2',
  right: 'left-full top-1/2 transform -translate-y-1/2 translate-x-2',
};
const arrowClassesByPosition = {
  top: 'bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1',
  bottom: 'top-0 left-1/2 transform -translate-x-1/2 -translate-y-1',
  left: 'right-0 top-1/2 transform -translate-y-1/2 -translate-x-1',
  right: 'left-0 top-1/2 transform -translate-y-1/2 translate-x-1',
};

interface TooltipProps extends AriaTooltipProps {
  children: React.ReactNode;
  className?: string;
  placement?: 'top' | 'bottom' | 'left' | 'right';
  state: TooltipTriggerState;
}
function Tooltip({ className, state, placement = 'top', ...props }: TooltipProps) {
  const { tooltipProps } = useTooltip(props, state);

  const containerRef = React.useRef<HTMLDivElement>(null!);
  const arrowRef = React.useRef<HTMLDivElement>(null!);

  return (
    <Transition
      as={React.Fragment}
      show={state.isOpen}
      enter="transition-opacity duration-200"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-200"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
      afterEnter={() => {
        if (!containerRef.current) {
          return;
        }

        const pos = containerRef.current.getBoundingClientRect();

        if (pos.x < 0) {
          containerRef.current.style.left = `calc(50% + ${Math.abs(pos.x)}px + 0.5rem)`;
          arrowRef.current.style.left = `calc(50% - ${Math.abs(pos.x)}px + 0.5rem)`;
        }

        if (pos.x + pos.width > window.innerWidth) {
          containerRef.current.style.left = `calc(50% - ${
            pos.width - (window.innerWidth - pos.x)
          }px - 0.5rem)`;
          arrowRef.current.style.left = `calc(50% + ${
            pos.width - (window.innerWidth - pos.x)
          }px - 0.5rem)`;
        }
      }}
    >
      <div
        ref={containerRef}
        className={cn(
          'absolute w-[calc(100%-1rem)] m-1 transition-all text-black bg-white text-left border border-gray-200 rounded-lg',
          classesByPosition[placement],
          className
        )}
        {...mergeProps(props, tooltipProps)}
      >
        <div className="relative z-20 rounded-lg bg-white px-4 py-3">{props.children}</div>
        <div
          ref={arrowRef}
          className={cn(
            'absolute w-3 h-3 transition-all bg-white border border-gray-200 rounded-sm rotate-45 z-10',
            arrowClassesByPosition[placement]
          )}
        />
      </div>
    </Transition>
  );
}

interface TooltipButtonProps extends TooltipTriggerProps {
  children: React.ReactElement;
  className?: string;
  tooltip: React.ReactNode;
  tooltipClassname?: string;
}
function TooltipButton(props: TooltipButtonProps) {
  const { children, className, tooltip, tooltipClassname, ...rest } = props;

  const state = useTooltipTriggerState(rest);
  const ref = React.useRef(null);

  // Get props for the trigger and its tooltip
  const { triggerProps, tooltipProps } = useTooltipTrigger(rest, state, ref);

  return (
    <div className={cn('relative', className)}>
      {React.cloneElement(children, { ref, ...triggerProps })}

      <Tooltip state={state} {...tooltipProps} className={tooltipClassname}>
        {tooltip}
      </Tooltip>
    </div>
  );
}

export { TooltipButton, Tooltip };
