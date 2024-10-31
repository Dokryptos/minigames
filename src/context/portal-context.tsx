import * as React from 'react';

type OpenArgs = {
  key: string;
  child: React.ReactNode;
};
type PortalContextType = {
  children: React.ReactNode;
  add: (args: OpenArgs) => void;
  remove: (key: string) => void;
  count: number;
};

const initialValue: PortalContextType = {
  children: [],
  add: () => {},
  remove: () => {},
  count: 0,
};

const PortalContext = React.createContext<PortalContextType>(
  initialValue
) as React.Context<PortalContextType> & { initialValue: typeof initialValue };

const usePortalContext = (): PortalContextType => {
  const [nodes, setNodes] = React.useState<Record<string, React.ReactNode>>({});

  const remove = (key: string) => {
    setNodes((prev) => {
      const copy = { ...prev };
      delete copy[key];
      return copy;
    });
  };

  const add = (args: { key: string; child: React.ReactNode }) => {
    const { key, child } = args;

    setNodes((prev) => {
      return { ...prev, [key]: child };
    });
  };

  const children = React.useMemo(
    () =>
      Object.entries(nodes).map(([key, child]): React.ReactNode => {
        if (child && typeof child === 'object' && 'key' in child) {
          return React.cloneElement(child, { key });
        }
        return <React.Fragment key={key}>{child}</React.Fragment>;
      }),
    [nodes]
  );

  return {
    add,
    children,
    remove,
    count: Object.keys(nodes).length,
  };
};

// eslint-disable-next-line react-refresh/only-export-components
export { usePortalContext, PortalContext };
