import * as React from 'react';
import MarkdownToJSX from 'markdown-to-jsx';

const Markdown = (props: React.ComponentProps<typeof MarkdownToJSX>) => {
  return (
    <MarkdownToJSX
      options={{
        forceBlock: true,
        overrides: {
          h3: { props: { className: 'text-xl font-semibold mt-6 mb-4' } },
          strong: { props: { className: 'block text-lg font-semibold mt-4' } },
          p: { props: { className: 'my-1' } },
        },
        ...props.options,
      }}
    >
      {props.children}
    </MarkdownToJSX>
  );
};

export default Markdown;
