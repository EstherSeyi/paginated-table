const fetchData = (
  req: string,
  onSuccess: (data: any) => void,
  onError: (error: string) => void,
  onLoad: () => void,
  stopLoad: () => void
) => {
  onLoad();
  return fetch(req)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      return response.json();
    })
    .then((response) => {
      onSuccess(response?.results);
      stopLoad();
      return response;
    })
    .catch((error) => {
      console.error(error);
      onError(error.message);
      stopLoad();
    });
};

export default fetchData;
