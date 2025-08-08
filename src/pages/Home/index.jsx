import React, { useState } from "react";
import { Link } from "react-router-dom";
import Form from "../../components/Form";
import { Modal } from 'react-modal-ab';
import "./style.scss";

function Home() {
  const [open, setOpen] = useState(false);

  const handleFormSubmit = () => {
    setOpen(true);
  };

  return (
    <>
      <main className="home_wrapper">
        <div className="home_wrapper--title">
          <h1>HRnet</h1>
        </div>
        <Link className="redirect" to="/employee-list">
          <p>View current employee</p>
        </Link>
        <h2 className="home_wrapper--subtitle">Create Employee</h2>
        <Form onSubmitSuccess={handleFormSubmit} />
        <Modal
          isOpen={open}
          onClose={() => setOpen(false)}
          title="Employee created !"
          size="md"
          closeOnOverlayClick={true}
        >
        </Modal>
      </main>
    </>
  );
}

export default Home;
