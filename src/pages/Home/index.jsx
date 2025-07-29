import React from "react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Modal from "../../components/Modal";

function Home() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    <main>
      <header>
        <h1>HRnet</h1>
        <Link className="redirect" to="/employee-list">
          <p>View current employee</p>
        </Link>
        {/* <button
          className="button"
          onClick={() => navigate("/employee-list")}
          aria-label="Navigate to employee list page"
        >
          View current employees
        </button> */}
        <button onClick={() => setOpen(true)}>Ouvrir la modale</button>
        <Modal
          isOpen={open}
          onClose={() => setOpen(false)}
          title="Employee created !"
          size="md"
          closeOnOverlayClick={true}
        ></Modal>
        <form></form>
      </header>
    </main>
  );
}

export default Home;
