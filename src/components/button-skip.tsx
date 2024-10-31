import * as React from 'react';

import { enableShortcuts } from '@/utils/env';
import Button from './button';
import { createPortal } from 'react-dom';
import { cn } from '@/utils/cn';

type ButtonSkipProps = React.ComponentProps<typeof Button>;
const ButtonSkip = (props: ButtonSkipProps) => {
  if (!enableShortcuts) {
    return null;
  }

  return createPortal(
    <Button
      variant="secondary"
      {...props}
      className={cn('fixed bottom-2 right-2 z-[10000]', props.className)}
    >
      skip
    </Button>,
    document.body
  );
};

export default ButtonSkip;
