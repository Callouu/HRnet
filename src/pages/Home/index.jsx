import React, { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "../../components/Modal";
import Form from "../../components/Form";
import "./style.scss";

function Home() {
  const [open, setOpen] = useState(false);

  const handleFormSubmit = () => {
    setOpen(true);
  };

  return (
    <>
      <main className="home-wrapper">
        <div className="home-title">
          <h1>HRnet</h1>
        </div>
        <Link className="redirect" to="/employee-list">
          <p>View current employee</p>
        </Link>
        <h2>Create Employee</h2>
        <Form onSubmitSuccess={handleFormSubmit} />
        <Modal
          isOpen={open}
          onClose={() => setOpen(false)}
          title="Employee created !"
          size="md"
          closeOnOverlayClick={true}
        >
          <p>Employee has been successfully created!</p>
        </Modal>
      </main>
    </>
  );
}

export default Home;
