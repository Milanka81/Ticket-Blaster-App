export const showContent = (content: string, fullContent: boolean): string => {
  if (fullContent || content.length < 180) return content;
  return `${content.substring(0, 180)}...`;
};
