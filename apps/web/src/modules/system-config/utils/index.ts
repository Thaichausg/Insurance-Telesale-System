export const maskApiKey = (apiKey: string): string => {
  if (!apiKey) return '';
  if (apiKey.length <= 8) return '********';
  
  const start = apiKey.slice(0, 4);
  const end = apiKey.slice(-4);
  const maskedLength = apiKey.length - 8;
  const mask = '*'.repeat(Math.min(maskedLength, 15)); // Giới hạn chuỗi * đừng dài quá xấu UI
  
  return `${start}${mask}${end}`;
};
