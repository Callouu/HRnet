import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import DataTable from "react-data-table-component";
import "./style.scss";
import { Direction } from "react-data-table-component";

/**
 * EmployeeList page component for HRnet.
 *
 * - Displays a searchable and sortable table of all employees.
 * - Formats date fields for display.
 * - Allows filtering employees by any field using a search input.
 * - Provides navigation back to the home page.
 *
 * @category Pages
 * @component
 * @returns { React.Component } A React component of the employee list.
 */
function EmployeeList() {
  const employees = useSelector((state) => state.employees.employees);
  const [search, setSearch] = useState("");

  // Date formatting function
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    if (isNaN(date)) return dateStr;
    return date.toLocaleDateString("fr-FR").slice(0, 8);
  };

  // Columns definition for DataTable
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

    // Employee filtering for search input
    const filteredEmployees = employees.filter((employee) =>
    Object.values(employee)
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <>
      <main className="employee_wrapper">
        <h1 className="employee_wrapper--title">Employee List</h1>
        <input
          type="text"
          placeholder="Search..."
          className="employee_wrapper--input"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <DataTable
          columns={columns}
          data={filteredEmployees}
          direction={Direction.AUTO}
          pagination
          responsive = {true}
          wrap = {true}
          compact = {true}
          highlightOnHover
          striped
        />
        <Link className="redirect" to="/">
          <p>Home</p>
        </Link>
      </main>
    </>
  );
}

export default EmployeeList;
