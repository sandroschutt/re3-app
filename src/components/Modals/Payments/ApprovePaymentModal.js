import { useState } from "react";
import { Form, Modal } from "react-bootstrap";
import Payments from "../../../classes/Payments";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileInvoiceDollar } from "@fortawesome/free-solid-svg-icons";
import Api from "../../../classes/Api";

export function ApprovePaymentModal(props) {
  const payment = props.payment;
  const [approve, setApprove] = useState("");

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  async function handleDownloadImage(paymentNote, label) {
    try {
      const response = await fetch(paymentNote);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = label;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading the image:", error);
    }
  }

  function handleClientProofImageDownload(paymentNote, role) {
    if (role === "Empresa" || role === undefined) return;

    return (
      <div className="d-flex justify-content-end my-3 gap-2">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => {
            alert("Removendo comprovante (fake)...");
          }}
        >
          Remover
        </button>
        <button className="btn btn-primary">
          <a
            className="text-light text-decoration-none"
            href={paymentNote}
            download={payment.paymentNote}
            onClick={(event) => {
              event.preventDefault();
              handleDownloadImage(paymentNote, payment.paymentNote);
            }}
          >
            Download
          </a>
        </button>
      </div>
    );
  }

  function handleProofPayment() {
    Payments.approve(payment.id, approve);
  }

  function handleRoleActions(role) {
    if (role !== "Empresa" && role !== "Ong") return;

    return (
      <div className="d-flex justify-content-end gap-2">
        <button className="btn btn-outline-secondary" onClick={handleClose}>
          Cancelar
        </button>
        <button
          className="btn btn-danger"
          type="submit"
          onClick={() => setApprove(0)}
        >
          Reprovar
        </button>
        <button
          className="btn btn-primary"
          type="submit"
          onClick={() => setApprove(1)}
        >
          Aprovar
        </button>
      </div>
    );
  }

  function handlePaymentNote(role) {
    let paymentNote = payment.paymentNote;

    if (paymentNote === null)
      return (
        <div className="alert alert-warning my-5" role="alert">
          O cliente ainda não enviou o comprovante de pagamento.
        </div>
      );

    if (paymentNote !== null)
      paymentNote = Api.endpoint(`uploads/payment/${paymentNote}`);

    return (
      <>
        <img src={paymentNote} width={450} />
        <div className="d-flex gap-3 justify-content-end pt-5">
          {handleClientProofImageDownload(paymentNote, role)}
        </div>
      </>
    );
  }

  return (
    <>
      <button
        className="btn btn-outline-primary d-flex align-items-center gap-2"
        onClick={handleShow}
      >
        <FontAwesomeIcon icon={faFileInvoiceDollar} />
        Ver comprovante
      </button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header className="bg-success text-white" closeButton>
          <Modal.Title>{`Comprovante do Pagamento Nº ${payment.id}`}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={(event) => {
              event.preventDefault();
              handleProofPayment();
            }}
          >
            <div>
              <label htmlFor="price" className="form-label mb-2">
                <strong>Comprovante:</strong>
              </label>
              {handlePaymentNote(props.userRole)}
            </div>
            <div>{handleRoleActions(props.userRole)}</div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
