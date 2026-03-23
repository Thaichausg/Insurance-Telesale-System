export const checkKeywordMatch = (message: string, keyword: string): boolean => {
  if (!message || !keyword) return false;
  // Loại bỏ dấu, viết thường, so sánh pattern
  const normalize = (str: string) => str.toLowerCase().trim();
  return normalize(message).includes(normalize(keyword));
};

export const highlightKeyword = (text: string, keyword: string) => {
  if (!keyword.trim()) return text;
  // Simple highlight (This is for utils context, React UI handles JSX separately)
  return text.split(new RegExp(`(${keyword})`, 'gi')).join('');
};
