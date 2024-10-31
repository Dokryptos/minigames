import * as React from 'react';
import { Transition } from '@headlessui/react';

const Loader = React.lazy(() => import('./loader'));

const LoaderSuspense = ({ show = true }: { show?: boolean }) => {
  return (
    <React.Suspense fallback={<div className="fixed left-0 top-0 size-full bg-black" />}>
      <Transition
        appear={true}
        show={show}
        as={React.Fragment}
        enter="transition-opacity delay-200 duration-200"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <Loader />
      </Transition>
    </React.Suspense>
  );
};

export default LoaderSuspense;
