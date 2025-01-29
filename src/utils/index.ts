import { urlRegExp } from "./constants";

export const generateUniqueUrl = (url?: string) => {
  if (!url) {
    return "";
  }
  return url.startsWith("blob") ? url : `${url}?timestamp=${new Date().getTime()}`;
};

export const isValidUrl = (url: string): boolean => {
  try {
    const parsedUrl = new URL(url);

    if (!["http:", "https:"].includes(parsedUrl.protocol)) {
      return false;
    }
    return urlRegExp.test(url);
  } catch {
    return false;
  }
};
