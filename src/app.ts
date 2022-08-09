import fetchData from "./helpers/fetch";
import displayTableData from "./helpers/display-table";

const startApp = async () => {
  const state = {
    currentPage: 0,
    availableData: {
      paging: {},
    },
  };

  // Get a reference to the table, error and buttons
  const tableRef: any = document.querySelector("#pag-table > tbody");
  const errorRef: any = document.querySelector("#error");
  const nextButton = document.querySelector("#next");
  const prevButton = document.querySelector("#prev");

  errorRef.innerHTML = "";

  /**
   * onClick of next button
   */
  nextButton?.addEventListener("click", async () => {
    if (!state.availableData.paging.hasOwnProperty("next")) {
      console.log("no next");
      //TODO: Disable next button
      return;
    }

    nextButton.innerHTML = "Loading...";
    const nextPage = state.currentPage + 1;
    if (state.availableData.hasOwnProperty(nextPage)) {
      // if data is available for prev fetching
      displayTableData(state.availableData[`${nextPage}`], tableRef);
    } else {
      await fetchData(
        `https://randomapi.com/api/8csrgnjw?key=LEIX-GF3O-AG7I-6J84&page=${nextPage}`,
        (response) => {
          const [data] = response;
          state.availableData = data;
          displayTableData(data[`${nextPage}`], tableRef);
        },
        (error) => {
          errorRef.style.color = "red";
          errorRef.style.marginBottom = "1em";
          errorRef.innerHTML = error;
        }
      );
    }
    state.currentPage++;
    nextButton.innerHTML = "Next";
  });

  /**
   * onClick of prev button
   */
  prevButton?.addEventListener("click", async () => {
    if (!state.availableData.paging.hasOwnProperty("previous")) {
      console.log("no prev!!!");
      //TODO: Disable prev button
      return;
    }

    prevButton.innerHTML = "Loading...";
    const prevPage = state.currentPage - 1;
    if (state.availableData.hasOwnProperty(prevPage)) {
      // if data is available for prev fetching
      displayTableData(state.availableData[`${prevPage}`], tableRef);
    } else {
      await fetchData(
        `https://randomapi.com/api/8csrgnjw?key=LEIX-GF3O-AG7I-6J84&page=${prevPage}`,
        (response) => {
          const [data] = response;
          state.availableData = data;
          displayTableData(data[`${prevPage}`], tableRef);
        },
        (error) => {
          errorRef.style.color = "red";
          errorRef.style.marginBottom = "1em";
          errorRef.innerHTML = error;
        }
      );
    }
    state.currentPage--;
    prevButton.innerHTML = "Previous";
  });

  await fetchData(
    "https://randomapi.com/api/8csrgnjw?key=LEIX-GF3O-AG7I-6J84",
    (response) => {
      const [data] = response;
      state.currentPage = 1;
      state.availableData = data;
      displayTableData(data["1"], tableRef, true);
    },
    (error) => {
      errorRef.style.color = "red";
      errorRef.style.marginBottom = "1em";
      errorRef.innerHTML = error;
    }
  );
};

document.addEventListener("DOMContentLoaded", startApp);
