import * as React from 'react';

/**
 * Join an array of JSX elements with a separator.
 */
function jsxJoin(arr: React.ReactNode[], join: React.ReactNode) {
  return arr.map((node, i) => (
    <React.Fragment key={i}>
      {node}
      {i < arr.length - 1 && join}
    </React.Fragment>
  ));
}

export default jsxJoin;
