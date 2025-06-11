export function parseFiltersFromQuery<T>(
  query: Record<string, any>,
  filterConfig: { [K in keyof T]: (value: string) => T[K] }
): T {
  return (Object.keys(filterConfig) as Array<keyof T>).reduce((acc, key) => {
    const parser = filterConfig[key];
    const rawValue = query[key as string];
    if (typeof rawValue === 'string' && rawValue.trim() !== '') {
      acc[key] = parser(rawValue);
    }
    return acc;
  }, {} as T);
}
