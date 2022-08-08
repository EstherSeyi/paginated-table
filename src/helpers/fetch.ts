const fetchData = (
  req: string,
  onSuccess: (data: any) => void,
  onError: (error: string) => void
) => {
  return fetch(req)
    .then((response) => {
      if (!response.ok) {
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
    });
};

export default fetchData;
