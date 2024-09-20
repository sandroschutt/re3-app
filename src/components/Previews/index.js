import "./style.scss";
import DummyAvatarImage from "../../assets/images/r3d3_profile_avatar.png";
import { Button, Col, Row } from "react-bootstrap";
import { validateDate } from "../../validations/validateDate";
import { validatePhones } from "../../validations/validatePhones";
import { EditStudentModal } from "../Modals/EditStudentModal.js";

export function AdminUsersPreview(props) {
  const user = props.user;
  if (user !== "") {
    return (
      <>
        <Row className="admin-users--preview flex-column justify-content-between">
          <Col className="admin-users--preview--header d-flex align-items-center gap-4 col-2 w-100">
            <img src={DummyAvatarImage} alt="" />
            <div>
              <h2>{user.name}</h2>
              <p>
                <strong className="me-2">
                  {props.users === "student" ? "Estudante" : "Cliente"}
                </strong>
                {user.email}
              </p>
            </div>
          </Col>
          <Col className="admin-users-preview--children col-8 w-100">
            <UserCarData user={user} />
          </Col>
          <Col className="admin-users--preview--actions col-2 w-100 d-flex">
            <Row className="w-100 justify-content-around align-items-center">
              {props.actions.map((action, index) => {
                return (
                  <Col key={index}>
                    <Button
                      variant="outline-success"
                      className="w-100"
                      onClick={() => {
                        console.log(action);
                      }}
                    >
                      {action}
                    </Button>
                  </Col>
                );
              })}
            </Row>
          </Col>
        </Row>
        <EditStudentModal student={user} />
      </>
    );
  }
}

function UserCarData(props) {
  const user = props.user;

  if (user !== "") {
    return (
      <>
        <ul>
          <li>
            <p>
              <strong>Nome:</strong>
              {user.name}
            </p>
          </li>
          <li>
            <p>
              <strong>Função:</strong>
              {user.role}
            </p>
          </li>
          <li>
            <p>
              <strong>Doc:</strong>
              {user.document.type.toUpperCase()}
            </p>
          </li>
          <li>
            <p>
              <strong>Nº:</strong>
              {user.document.documentNumber}
            </p>
          </li>
          <li>
            <p>
              <strong>Data cad:</strong>
              {validateDate(user.createdAt)}
            </p>
          </li>
        </ul>

        <ul>
          <li>
            <p>
              <strong>Rua:</strong>
              {user.address.street}
            </p>
          </li>
          <li>
            <p>
              <strong>Cidade:</strong>
              {user.address.city}
            </p>
          </li>
          <li>
            <p>
              <strong>UF:</strong>
              {user.address.state}
            </p>
          </li>
          <li>
            <p>
              <strong>CEP:</strong>
              {user.address.zipcode}
            </p>
          </li>
        </ul>

        <ul>
          <li>
            <p>
              <strong>E-mail secundário:</strong>
              {user.emailSecondary !== undefined
                ? user.emailSecondary
                : "não definido"}
            </p>
          </li>
          <li>
            <p>
              <strong>Celular:</strong>
              {validatePhones(user.phone)}
            </p>
          </li>
        </ul>
      </>
    );
  }
}
