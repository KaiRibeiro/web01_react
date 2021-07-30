import React, { useState } from "react";
import firebase from "../../config/firebase";
import "firebase/auth";
import "./newUser.css";

function NewUser() {
  const [nome, setNome] = useState();
  const [sobrenome, setSobrenome] = useState();
  const [email, setEmail] = useState();
  const [senha, setSenha] = useState();
  const [msgTipo, setMsgTipo] = useState();
  const [msg, setMsg] = useState();
  const [carregando, setCarregando] = useState();


  function cadastrar() {
    setCarregando(1);
    setMsgTipo(null);

    if (!email || !senha || !nome || !sobrenome) {
      setCarregando(0);
      setMsgTipo("erro");
      setMsg("Você não preencheu todos os campos!");
    } else {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, senha)
        .then((resultado) => {
          setCarregando(0);
          setMsgTipo("ok");
          setMsg("Usuário cadastrado com sucesso!");
        })
        .catch((erro) => {
          setCarregando(0);
          setMsgTipo("erro");
          switch (erro.message) {
            case "Password should be at least 6 characters":
              setMsg("A senha deve ter pelo menos 6 caracteres");
              break;
            case "The email address is already in use by another account.":
              setMsg("Esse email já está em uso");
              break;
            case "The email address is badly formatted.":
              setMsg("O formato de email é inválido");
              break;
            default:
              setMsg(
                "Não foi possível cadastrar. Por favor, tente novamente mais tarde"
              );
              break;
          }
        });
    }
  }

  return (
    <main>
      <form className="formCadastro">
        <h1 className="mb-3 fw-bold text-center">
          pwn<span>Watcher</span>
        </h1>

        <h1 className="mb-3 fw-bold text-center">CADASTRO</h1>

        <div className="form-group">
          <label className="text-white lead fw-bold fw-bold" htmlFor="iptNome">
            Nome<span className="text-danger">*</span>
          </label>
          <input
            onChange={(e) => setNome(e.target.value)}
            id="iptNome"
            type="text"
            className="form-control"
            placeholder="Nome"
            required
          />
        </div>

        <div className="form-group">
          <label className="text-white lead fw-bold" htmlFor="iptSobrenome">
            Sobrenome<span className="text-danger">*</span>
          </label>
          <input
            onChange={(e) => setSobrenome(e.target.value)}
            id="iptSobrenome"
            type="text"
            className="form-control"
            placeholder="Sobrenome"
          />
        </div>

        <div className="form-group">
          <label className="text-white lead fw-bold" htmlFor="iptEmail">
            Email<span className="text-danger">*</span>
          </label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            id="iptEmail"
            type="email"
            className="form-control"
            placeholder="Insira um email"
            required
          />
        </div>

        <div className="form-group">
          <label className="text-white lead fw-bold" htmlFor="iptPass">
            Senha<span className="text-danger">*</span>
          </label>
          <input
            onChange={(e) => setSenha(e.target.value)}
            id="iptPass"
            type="password"
            className="form-control"
            placeholder="Insira uma senha"
            required
          />
        </div>


        <p className="mt-3">
          Já tem uma <a href="#">conta?</a>
        </p>

        {
          carregando ? <div className="d-flex justify-content-center"><div class="spinner-border text-light" role="status"> <span class="sr-only"></span> </div></div>
          : <button type="button" className="mt-3 w-100 btn btn-lg text-white" onClick={cadastrar}>Cadastrar</button>
        }

        <div className="mt-3">
          {msgTipo === "ok" && (
            <div
              className="alert alert-success d-flex align-items-center"
              role="alert"
            >
              <i className="bi bi-person-check-fill sucessoCadastro"></i>
              <span>{msg}</span>
            </div>
          )}
        </div>

        <div className="mt-3">
          {msgTipo === "erro" && (
            <div
              className="alert alert-danger d-flex align-items-center"
              role="alert"
            >
              <i className="bi bi-exclamation-triangle-fill"></i>
              <span>
                <strong> Oops!! </strong>
                {msg}
              </span>
            </div>
          )}
        </div>
      </form>
    </main>
  );
}

export default NewUser;
