import React from "react";
import { Link } from "react-router-dom";

function EmployeeList() {
  return (
    <main>
      <h1>Employee List</h1>
      <input type="search" placeholder="Search..." />
      <Link className="redirect" to="/">
        <p>Home</p>
      </Link>
    </main>
  );
}

export default EmployeeList;
