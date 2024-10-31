import * as React from 'react';
import { Transition } from '@headlessui/react';
import Button from '@/components/button';
import { cn } from '@/utils/cn';

type BackdropSpoilerProps = { children: React.ReactNode; className?: string; show?: boolean };
const BackdropSpoiler = ({ children, className, show }: BackdropSpoilerProps) => {
  const [state, setState] = React.useState<'hide' | 'show'>(show ? 'show' : 'hide');

  return (
    <div className={cn('relative', className)}>
      {children}

      <Transition
        show={state === 'show'}
        className="absolute inset-0 bg-black/50 text-center backdrop-blur-md transition"
        leave="duration-300 ease-out"
        leaveFrom="opacity-100 backdrop-blur-md"
        leaveTo="opacity-0 backdrop-none"
      >
        <div className="flex size-full flex-col items-center justify-center gap-4 overflow-auto p-4">
          <p className="text-lg font-semibold uppercase text-red-500">Attention</p>

          <p>Cet indice contient la réponse à l'objectif.</p>
          <p>Êtes-vous sûr de vouloir continuer ?</p>

          <Button className="max-sm:h-12 max-sm:p-2 sm:mt-4" onClick={() => setState('hide')}>
            révéler la réponse
          </Button>
        </div>
      </Transition>
    </div>
  );
};

export default BackdropSpoiler;
