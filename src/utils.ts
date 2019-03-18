/**
 * Returns true if the given value is a function.
 */
export function isFunc(val: any): boolean {
  return (typeof val === "function");
}

/**
 * Returns true if the given value is a function.
 */
export function isPromise(val: any): boolean {
  return (!!val && typeof val.then === "function");
}

/**
 * Capitalize the first letter of the given string and return it.
 */
export function capitalize(str: string): string {
  return (str.charAt(0).toUpperCase() + str.slice(1));
}

/**
 * Generate and return a random value between the 2 numbers.
 */
export function randomRange(min: number, max: number): number {
  return min + Math.round(Math.random() * (max - min));
}

/**
 * Wraps the given handler function with a memoization/cache layer that enables a function
 * to only be bound once for the given key.
 */
export function memoize<T extends (...args: any[]) => any>(func: T) {
  let cache: { [key: string]: () => void } = {};

  return function (key: string, ...args: Parameters<T>) {
    if (!cache[key]) {
      cache[key] = () => func(...args);
    }

    return cache[key];
  };
}