import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import DataTable from "react-data-table-component";

function EmployeeList() {
  const employees = useSelector(state => state.employees.employees);

  const columns = [
    { name: "First Name", selector: row => row.firstName, sortable: true, },
    { name: "Last Name", selector: row => row.lastName, sortable: true },
    { name: "Start Date", selector: row => row.startDate, sortable: true },
    { name: "Department", selector: row => row.department, sortable: true },
    { name: "Date of Birth", selector: row => row.dateOfBirth, sortable: true },
    { name: "Street", selector: row => row.street},
    { name: "City", selector: row => row.city },
    { name: "State", selector: row => row.state },
    { name: "Zip Code", selector: row => row.zipCode },
  ];

  return (
    <main>
      <h1>Employee List</h1>
      <DataTable
        columns={columns}
        data={employees}
        pagination
        highlightOnHover
        striped
      />
      <Link className="redirect" to="/">
        <p>Home</p>
      </Link>
    </main>
  );
}

export default EmployeeList;
