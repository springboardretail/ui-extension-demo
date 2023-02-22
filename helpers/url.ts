export const extensionUrl = process.env.NEXT_PUBLIC_EXTENSION_BASE_URL;

export const extensionUrlWithParams = (path: string, query: any = {}) => {
  const url = new URL(path, extensionUrl);
  url.search = new URLSearchParams(query).toString();
  return url.toString();
};
