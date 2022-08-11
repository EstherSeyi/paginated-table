import fetchData from "./helpers/fetch";
import displayTableData from "./helpers/display-table";

const startApp = async () => {
  const state = {
    availableData: {
      paging: {},
    },
    currentPage: 1,
  };

  // Get a reference to the table, error, buttons, and pageview labels
  const tableRef = document.querySelector(
    "#pag-table > tbody"
  ) as HTMLTableSectionElement;
  const errorRef = document.querySelector("#error") as HTMLElement;
  const nextButton = document.querySelector("#next") as HTMLButtonElement;
  const prevButton = document.querySelector("#prev") as HTMLButtonElement;
  const pageview = document.querySelector("#pageview") as HTMLLabelElement;

  errorRef.innerHTML = "";
  prevButton.disabled = true;

  /**
   * onClick of next button
   */
  nextButton?.addEventListener("click", async () => {
    if (!state.availableData.paging.hasOwnProperty("next")) {
      nextButton.disabled = true;
      return;
    }

    prevButton.disabled = false;

    const nextPage = state.currentPage + 1;

    if (state.availableData.hasOwnProperty(nextPage)) {
      // if data is available for prev fetching
      displayTableData(state.availableData[`${nextPage}`], tableRef);
      pageview.dataset.pageview = `${nextPage}`;
      pageview.innerHTML = `Showing Page ${nextPage}`;
    } else {
      await fetchData(
        `https://randomapi.com/api/8csrgnjw?key=LEIX-GF3O-AG7I-6J84&page=${nextPage}`,
        (response) => {
          const [data] = response;
          state.availableData = data;
          displayTableData(data[`${nextPage}`], tableRef);
          pageview.dataset.pageview = `${nextPage}`;
          pageview.innerHTML = `Showing Page ${nextPage}`;
        },
        (error) => {
          errorRef.style.color = "red";
          errorRef.style.marginBottom = "1em";
          errorRef.innerHTML = error;
        },
        () => {
          nextButton.innerHTML = "Loading...";
          prevButton.disabled = true;
          nextButton.disabled = true;
        },
        () => {
          nextButton.innerHTML = "Next";
          prevButton.disabled = false;
          if (!state.availableData.paging.hasOwnProperty("next")) {
            nextButton.disabled = true;
          } else {
            nextButton.disabled = false;
          }
        }
      );
    }
    state.currentPage++;
  });

  /**
   * onClick of previous button
   */
  prevButton?.addEventListener("click", async () => {
    if (state.currentPage === 1) {
      prevButton.disabled = true;
      return;
    }

    const prevPage = state.currentPage - 1;

    await fetchData(
      `https://randomapi.com/api/8csrgnjw?key=LEIX-GF3O-AG7I-6J84&page=${prevPage}`,
      (response) => {
        prevButton.disabled = false;
        nextButton.disabled = false;
        const [data] = response;
        state.availableData = data;
        displayTableData(data[`${prevPage}`], tableRef);
        pageview.dataset.pageview = `${prevPage}`;
        pageview.innerHTML = `Showing Page ${prevPage}`;
      },
      (error) => {
        errorRef.style.color = "red";
        errorRef.style.marginBottom = "1em";
        errorRef.innerHTML = error;
      },
      () => {
        prevButton.innerHTML = "Loading...";
        prevButton.disabled = true;
        nextButton.disabled = true;
      },
      () => {
        prevButton.innerHTML = "Previous";
        nextButton.disabled = false;
        if (pageview.innerHTML === "Showing Page 1") {
          prevButton.disabled = true;
        } else {
          prevButton.disabled = false;
        }
      }
    );
    //

    state.currentPage--;
  });

  // Fetch data on page load
  await fetchData(
    "https://randomapi.com/api/8csrgnjw?key=LEIX-GF3O-AG7I-6J84",
    (response) => {
      const [data] = response;
      state.currentPage = 1;
      state.availableData = data;
      displayTableData(data["1"], tableRef, true);
      pageview.dataset.pageview = "1";
      pageview.innerHTML = "Showing Page 1";
    },
    (error) => {
      errorRef.style.color = "red";
      errorRef.style.marginBottom = "1em";
      errorRef.innerHTML = error;
    },
    () => {
      nextButton.innerHTML = "Loading...";
      prevButton.disabled = true;
      nextButton.disabled = true;
    },
    () => {
      nextButton.innerHTML = "Next";
      nextButton.disabled = false;
      if (state.currentPage === 1) {
        prevButton.disabled = true;
      } else {
        prevButton.disabled = false;
      }
    }
  );
};

document.addEventListener("DOMContentLoaded", startApp);
