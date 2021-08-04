import React, { useState } from 'react';
import './login.css';
import { Link } from 'react-router-dom';

import firebase from '../../config/firebase';
import 'firebase/auth';

function Login() {
  const [email, setEmail] = useState();
  const [senha, setSenha] = useState();
  const [msgTipo, setMsgTipo] = useState();

  function authenicate() {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, senha)
      .then((resultado) => {
        setMsgTipo('ok');
      })
      .catch((erro) => {
        setMsgTipo('erro');
      });
  }

  return (
    <main className="formulario-Login">
      <form action="./dashboard.html">
        <h1 className="mb-3 fw-bold">
          pwn<span>Watcher</span>
        </h1>

        <p className="lead fw-bold text-white">
          Ferramenta para relatórios de cybersegurança.
        </p>

        <div className="form-group">
          <label className="text-white lead fw-bold" htmlFor="iptEmail">
            Email
          </label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className="form-control"
            id="iptEmail"
            placeholder="nome@exemplo.com"
            required
          />
        </div>

        <div className="form-group">
          <label className="text-white lead fw-bold" htmlFor="iptSenha">
            Senha
          </label>
          <input
            onChange={(e) => setSenha(e.target.value)}
            type="password"
            className="form-control"
            id="iptSenha"
            placeholder="Senha"
            required
          />
        </div>

        <button
          type="button"
          className="w-100 btn btn-lg text-white"
          onClick={authenicate}
        >
          Entrar
        </button>

        <div className="mt-3">
          {msgTipo === 'erro' && (
            <div
              className="alert alert-danger d-flex align-items-center"
              role="alert"
            >
              <i className="bi bi-exclamation-triangle-fill"></i>
              <span>
                <strong> Oops!! </strong>Por favor, verifique se o seu e-mail e
                senha estão corretos, ou crie uma conta.
              </span>
            </div>
          )}
        </div>
        <Link to='cadastro' className="registrarLink">Criar uma conta<i className="bi bi-arrow-right-short"></i></Link>

      </form>
    </main>
  );
}

export default Login;
