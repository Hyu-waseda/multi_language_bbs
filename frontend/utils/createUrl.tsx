export const createURL = (path: string, queryParams: URLSearchParams) => {
  const queryString = queryParams.toString();
  const finalUrl = `${path}${queryString ? `?${queryString}` : ""}`;
  return finalUrl;
};
