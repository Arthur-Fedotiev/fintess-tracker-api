export const isObject = (item: unknown): item is Record<string, any> =>
  !!(item && typeof item === 'object' && !Array.isArray(item));
