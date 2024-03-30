const debounce = <T extends (...args: any[]) => any>(
  func: T,
  timeout: number
): ((...args: Parameters<T>) => void) => {
  let timer: ReturnType<typeof setTimeout>;

  return function (this: any, ...args: Parameters<T>) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
};

const throttle = <T extends (...args: any[]) => void>(
  func: T,
  timeout: number
): ((...args: Parameters<T>) => void) => {
  let isWaiting: boolean;

  return function (this: any, ...args: Parameters<T>) {
    if (!isWaiting) {
      func.apply(this, args);
      isWaiting = true;
      setTimeout(() => {
        isWaiting = false;
      }, timeout);
    }
  };
};

export {debounce, throttle}
