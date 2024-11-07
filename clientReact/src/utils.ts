export const showContent = (content: string): string => {
  if (!content || content.length < 180) return content;
  return `${content.substring(0, 180)}...`;
};
export const handleEmpty = (content: string): string => {
  return content || "";
};

export const imgSrc = (img: string): string => {
  if (img) {
    return `http://localhost:9005/images/${img}`;
  } else {
    return "/img/favicon.svg";
  }
};
