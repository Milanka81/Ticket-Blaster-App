import { Area } from "react-easy-crop";

export const showContent = (content: string): string => {
  if (!content || content.length < 180) return content;
  return `${content.substring(0, 180)}...`;
};
export const handleEmpty = (content: string): string => {
  return content || "";
};
export const imgSrc = (img: string | undefined | null): string => {
  if (img) {
    return `http://localhost:9005/images/${img}`;
  } else {
    return "/img/favicon.svg";
  }
};
export const getCroppedImg = async (
  imageSrc: string,
  crop: Area
): Promise<File> => {
  const image = new Image();
  image.src = imageSrc;

  return new Promise<File>((resolve, reject) => {
    image.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      const { width, height, x, y } = crop;

      canvas.width = width;
      canvas.height = height;

      if (ctx) {
        ctx.drawImage(image, x, y, width, height, 0, 0, width, height);
      } else {
        reject(new Error("Failed to get canvas context"));
      }

      canvas.toBlob(
        (blob) => {
          if (blob) {
            const file = new File([blob], "cropped-image.jpg", {
              type: "image/jpeg",
            });
            resolve(file);
          } else {
            reject(new Error("Failed to create Blob from canvas"));
          }
        },
        "image/jpeg",
        1
      );
    };

    image.onerror = (error) => {
      reject(error);
    };
  });
};
export function formatDate(dateString: string): string {
  const date = new Date(dateString);

  const options: Intl.DateTimeFormatOptions = {
    month: "long",
    day: "numeric",
    year: "numeric",
  };
  const formatter = new Intl.DateTimeFormat("en-US", options);

  const formattedDate = formatter.format(date);

  const day = date.getDate();
  const ordinalSuffix = (n: number): string => {
    if (n % 10 === 1 && n % 100 !== 11) return "st";
    if (n % 10 === 2 && n % 100 !== 12) return "nd";
    if (n % 10 === 3 && n % 100 !== 13) return "rd";
    return "th";
  };

  const [month, , year] = formattedDate.split(" ");
  return `${month} ${day}${ordinalSuffix(day)}, ${year}`;
}
