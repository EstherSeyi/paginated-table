import fetchData from "./helpers/fetch";

type User = {
  age: number;
  gender: string;
  id: string;
  row: number;
};

const startApp = async () => {
  // Get a reference to the table
  const tableRef: any = document.querySelector("#pag-table > tbody");
  const errorRef: any = document.querySelector("#error");
  const nextButton = document.querySelector("#next");
  const prevButton = document.querySelector("#prev");
  errorRef.innerHTML = "";

  nextButton?.addEventListener("click", () => {
    console.log("next");
  });

  prevButton?.addEventListener("click", () => {
    console.log("prev");
  });

  await fetchData(
    "https://randomapi.com/api/8csrgnjw?key=LEIX-GF3O-AG7I-6J84",
    (response) => {
      const [{ 1: users1, paging, ...rest }] = response;
      console.log(users1, rest, paging, window.location.href);

      users1.forEach((user: User) => {
        // Insert a row at the end of the table
        let newRow = tableRef?.insertRow(-1);

        //insert cells for row, gender and age
        let row = newRow.insertCell(0);
        let gender = newRow.insertCell(1);
        let age = newRow.insertCell(2);

        row.appendChild(document.createTextNode(`${user.row}`));
        gender.appendChild(document.createTextNode(user.gender));
        age.appendChild(document.createTextNode(`${user.age}`));
      });
    },
    (error) => {
      errorRef.style.color = "red";
      errorRef.style.marginBottom = "1em";
      errorRef.innerHTML = error;
    }
  );
};

document.addEventListener("DOMContentLoaded", startApp);
