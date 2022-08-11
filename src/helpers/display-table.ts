import { User } from "../types";

const displayTableData = (
  data: User[],
  tableRef: HTMLTableSectionElement,
  init?: boolean
) => {
  data.forEach((user: User, index: number) => {
    // Insert a row at the end of the table
    if (!init) {
      tableRef.deleteRow(index);
    }
    const newRow = tableRef?.insertRow(index);
    newRow.dataset.entryid = user.id;

    //insert cells for row, gender and age
    const row = newRow.insertCell(0);
    const gender = newRow.insertCell(1);
    const age = newRow.insertCell(2);

    row.appendChild(document.createTextNode(`${user.row}`));
    gender.appendChild(document.createTextNode(user.gender));
    age.appendChild(document.createTextNode(`${user.age}`));
  });
};

export default displayTableData;
