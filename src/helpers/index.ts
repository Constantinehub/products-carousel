const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

const convertArrayToMap = <T, K extends keyof T>(arr: T[], key?: K): Map<T[K] | string, T> => {
  const map = new Map<T[K] | string, T>();

  for (const item of arr) {
    if (key) {
      map.set(item[key], item);
    } else {
      map.set(String(item), item);
    }
  }

  return map;
};

const delay = (ms = 1000) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export { formatCurrency, convertArrayToMap, delay };
