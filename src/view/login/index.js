import React from "react";
import "./login.css";

function login() {
  return (
      <main className="formulario-login">
        <form action="./dashboard.html">

          <h1 className="mb-3 fw-bold">
            pwn<span>Watcher</span>
          </h1>

          <p className="lead text-white">
            Ferramenta para relatórios de cybersegurança.
          </p>

          <div className="form-group">
            <label className="text-white lead" htmlFor="iptEmail">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="iptEmail"
              placeholder="nome@exemplo.com"
              required
            />
          </div>

          <div className="form-group">
            <label className="text-white lead" htmlFor="iptSenha">
              Senha
            </label>
            <input
              type="password"
              className="form-control"
              id="iptSenha"
              placeholder="Senha"
              required
            />
          </div>

          <div className="checkbox mb-3">
            <label>
              <input type="checkbox" value="lembrar_usuario" id="chkLembrar" />
              Lembrar Usuário
            </label>
          </div>
          
          <button className="w-100 btn btn-lg text-white">Entrar</button>

          <div>
              <span className="text-white"><i className="bi bi-exclamation-circle"></i><strong> Ops!!</strong>Por favor, verifique se o seu e-mail e senha estão corretos, ou crie uma conta.</span>
          </div>
        </form>
      </main>
  );
}

export default login;
