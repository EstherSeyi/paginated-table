import { User } from "../types";

const displayTableData = (data: [User], tableRef: any, init?: boolean) => {
  data.forEach((user: User, index: number) => {
    // Insert a row at the end of the table
    if (!init) {
      tableRef.deleteRow(index);
    }
    let newRow = tableRef?.insertRow(index);

    //insert cells for row, gender and age
    let row = newRow.insertCell(0);
    let gender = newRow.insertCell(1);
    let age = newRow.insertCell(2);

    row.appendChild(document.createTextNode(`${user.row}`));
    gender.appendChild(document.createTextNode(user.gender));
    age.appendChild(document.createTextNode(`${user.age}`));
  });
};

export default displayTableData;
