export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
};

export const formatPercentage = (value: number) => {
  return `${value.toFixed(2)}%`;
};
