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
