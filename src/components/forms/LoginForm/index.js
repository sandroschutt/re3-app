import "./style.css";
import ValidateInputs from "../../../validations/Inputs";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import User from "../../../classes/User";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [validationMessage, setValidationMessage] = useState("");
  const user = new User();

  function handleUsername(event) {
    setUsername(event.target.value);
  }

  function handlePassword(event) {
    setPassword(event.target.value);
  }

  function handlePasswordVisibility() {
    if (passwordVisibility === false) {
      setPasswordVisibility(true);
    } else setPasswordVisibility(false);
  }

  function handleSubmit() {
    let data = { email: username, password: password };

    try {
      user.login(data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="d-flex">
      <form id="loginForm">
        <h4>Login</h4>

        <div className="d-block m-4">
          <label htmlFor="username">Nome de usuário ou e-mail:</label>
          <input
            type="text"
            name="username"
            id="username"
            value={username}
            placeholder="seu@email.com"
            onChange={(event) => handleUsername(event)}
          />
          <label htmlFor="password">Senha:</label>
          <div className="password-input-container">
            <input
              type={passwordVisibility ? "text" : "password"}
              name="password"
              id="password"
              className="mb-0"
              value={password}
              onChange={(event) => handlePassword(event)}
            />
            <div id="icon">
              <FontAwesomeIcon
                icon={passwordVisibility ? faEyeSlash : faEye}
                onClick={() => handlePasswordVisibility()}
              />
            </div>
          </div>
          <p id="validationMessage" className="text-danger">
            {validationMessage}
          </p>
          <button
            type="button"
            style={{ opacity: username !== "" && password !== "" ? "1" : ".5" }}
            onClick={() => handleSubmit()}
            disabled={username !== "" && password !== "" ? false : true}
          >
            Entrar
          </button>
          <p className="text-center text-success mt-4 mb-0">
            Ainda não tem uma conta?{" "}
            <a href="/auth/register" className="text-primary">
              Clique aqui.
            </a>
          </p>
          <p className="text-center text-primary">
            <a href="/#">Esqueceu a senha?</a>
          </p>
        </div>
      </form>
    </div>
  );
}
