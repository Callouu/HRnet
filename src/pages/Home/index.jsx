import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../../components/Modal";

function Home() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    <main>
      <header>
        <h1>HRnet</h1>
        <button
          className="button"
          onClick={() => navigate("/employee-list")}
          aria-label="Navigate to employee list page"
        >
          Employee List
        </button>
        <button onClick={() => setOpen(true)}>Ouvrir la modale</button>
        <Modal
          isOpen={open}
          onClose={() => setOpen(false)}
          title="Employee created !"
          size="md"
          closeOnOverlayClick={true}
        ></Modal>
        <input type="search" placeholder="Search..." />
      </header>
    </main>
  );
}

export default Home;
