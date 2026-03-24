import { site } from "./site";

export function imgUrl(fileName: string) {
  const base = site.imageBaseUrl || "";
  if (!fileName) return "";
  if (fileName.startsWith("http://") || fileName.startsWith("https://") || fileName.startsWith("/")) return fileName;
  return base + fileName;
}
