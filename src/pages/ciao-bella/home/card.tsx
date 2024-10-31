// EXPLICATION : Ce composant permet de rendre les cartes personnages.
// EXPLICATION : Ce composant est utilise dans la page Home

import * as React from 'react';
import Button from '@/components/button';
import { cn } from '@/utils/cn';
import agentNameBackground from '@/assets/img/agent-name-background.png';
import Image from '@/components/image';

interface CardProps {
  img: { src: string; height: number; width: number; lqip: string };
  name: string;
  role: string;
  contentButton: React.ReactNode;
  actionButton: () => void;
  state: string;
  className?: string;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>((props, ref) => {
  const { className, img, name, contentButton, actionButton, state, role } = props;

  return (
    <div
      className={cn(
        'border-zinc-600 flex size-full flex-col overflow-hidden border border-solid relative grayscale rounded-sm',
        'transition-all transform ease-in-out duration-500 delay-200',
        state === 'unavailable' && '!grayscale pointer-events-none',
        className
      )}
      ref={ref}
    >
      <div className="relative h-0 grow">
        {state === 'unavailable' && (
          <div className="absolute left-0 top-0 z-10 size-full backdrop-blur-sm" />
        )}
        <Image className="size-full object-cover object-[center_top]" alt={name} {...img} />
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
          <div
            className="relative bg-contain bg-center bg-no-repeat p-4"
            style={{ backgroundImage: `url("${agentNameBackground}")` }}
          >
            <p className="font-gabriele whitespace-nowrap text-xl">{name}</p>
            <p className="h-1 whitespace-nowrap text-sm">{role}</p>
          </div>
        </div>
      </div>
      <div className="w-full shrink-0 p-4">
        <Button
          className="font-fixture w-full text-nowrap px-2 text-lg tracking-widest shadow-lg"
          onClick={actionButton}
        >
          <span className={cn('truncate', state === 'unavailable' && 'blur-[2px]')}>
            {contentButton}
          </span>
        </Button>
      </div>
    </div>
  );
});

export default Card;
