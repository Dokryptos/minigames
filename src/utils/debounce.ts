function debounce<T extends (...args: any[]) => any>(
  fn: T,
  wait = 0,
  options: { leading?: boolean; accumulate?: boolean } = {}
) {
  let lastCallAt: number | null = null;
  let deferred: ReturnType<typeof defer> | null = null;
  let timer: ReturnType<typeof setTimeout> | null = null;
  let pendingArgs: Parameters<T>[] = [];

  return async function debounced(...args: Parameters<T>) {
    const currentWait = getWait(wait);
    const currentTime = new Date().getTime();

    const isCold = !lastCallAt || currentTime - lastCallAt > currentWait;

    lastCallAt = currentTime;

    if (isCold && options.leading) {
      return options.accumulate
        ? Promise.resolve(fn.call(this, [args])).then((result) => result[0])
        : Promise.resolve(fn.call(this, ...args));
    }

    if (deferred) {
      clearTimeout(timer as ReturnType<typeof setTimeout>);
    } else {
      deferred = defer();
    }

    pendingArgs.push(args);
    timer = setTimeout(flush.bind(this), currentWait);

    if (options.accumulate) {
      const argsIndex = pendingArgs.length - 1;
      return deferred.promise.then((results) => results[argsIndex]);
    }

    return deferred.promise;
  };

  function flush() {
    const thisDeferred = deferred;

    if (timer) clearTimeout(timer);

    Promise.resolve(
      options.accumulate
        ? fn.call(this, pendingArgs)
        : fn.apply(this, pendingArgs[pendingArgs.length - 1])
    ).then(thisDeferred?.resolve, thisDeferred?.reject);

    pendingArgs = [];
    deferred = null;
  }
}

function getWait(wait: number | (() => number)) {
  return typeof wait === 'function' ? wait() : wait;
}

function defer() {
  const deferred = {} as {
    resolve: (value: any) => void;
    reject: (reason?: any) => void;
    promise: Promise<any>;
  };

  deferred.promise = new Promise((resolve, reject) => {
    deferred.resolve = resolve;
    deferred.reject = reject;
  });

  return deferred;
}

export default debounce;
