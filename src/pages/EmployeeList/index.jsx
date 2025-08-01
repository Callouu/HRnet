import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import DataTable from "react-data-table-component";

function EmployeeList() {
  const employees = useSelector((state) => state.employees.employees);

  // Date formatting function
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    if (isNaN(date)) return dateStr;
    return date.toLocaleDateString("fr-FR").slice(0, 8);
  };

  const columns = [
    { name: "First Name", selector: (row) => row.firstName, sortable: true },
    { name: "Last Name", selector: (row) => row.lastName, sortable: true },
    {
      name: "Start Date",
      selector: (row) => row.startDate,
      sortable: true,
      format: (row) => formatDate(row.startDate),
    },
    { name: "Department", selector: (row) => row.department, sortable: true },
    {
      name: "Date of Birth",
      selector: (row) => row.dateOfBirth,
      sortable: true,
      format: (row) => formatDate(row.dateOfBirth),
    },
    { name: "Street", selector: (row) => row.street },
    { name: "City", selector: (row) => row.city },
    { name: "State", selector: (row) => row.state.abbreviation },
    { name: "Zip Code", selector: (row) => row.zipCode },
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
