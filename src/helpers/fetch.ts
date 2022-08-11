import { Data } from "../types";

export const fetchData = (
  req: string,
  onSuccess: (data: Data[]) => void,
  onError: (error: string) => void,
  onLoad: () => void,
  stopLoad: () => void
) => {
  onLoad();
  return fetch(req)
    .then((response) => {
      if (!response.ok) {
        // throw error if response not ok
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      return response.json();
    })
    .then((response) => {
      onSuccess(response?.results);
      return response;
    })
    .catch((error) => {
      console.error(error);
      onError(error.message);
    })
    .finally(() => {
      stopLoad();
    });
};
