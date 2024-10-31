import structuredClone from '@ungap/structured-clone';

function deepMerge<A extends Record<string, any>, B extends Record<string, any>>(
  target: A,
  source: B
): A & B {
  const result = { ...target, ...source };
  for (const key of Object.keys(result)) {
    // @ts-expect-error - A & B is generic, it's supposed to be read-only for TS
    result[key] =
      typeof target[key] == 'object' && typeof source[key] == 'object'
        ? deepMerge(target[key], source[key])
        : structuredClone(result[key]);
  }
  return result;
}

export default deepMerge;
