import React, { useState } from "react";
import "./contato.css";
import { Link } from "react-router-dom";
import Sidebar from "../../components/sidebar";
import Cabecalho from "../../components/cabecalho";

function Contato() {
  return (
    <main>
      <div className="row justify-content-md-center">
        <Sidebar />
        <Cabecalho />

        <form
          className="
          formContato
          col-md-7
          text-dark
          bg-white
          rounded-3
          border border-danger
        "
        >
          <h2 className="text-white fw-bold mt-2">Mande Uma Mensagem</h2>
          <div className="form-group">
            <input
              type="email"
              className="form-control mt-2"
              id="iptEmail"
              placeholder="usuario@email.com"
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control mt-2"
              id="iptAssunto"
              placeholder="Assunto"
            />
          </div>
          <div className="form-group">
            <textarea
              className="form-control mt-2"
              id="iptMensagem"
              rows="5"
              placeholder="Mensagem"
            ></textarea>
          </div>
          <button type="submit" className="w-50 btn btn-lg text-white fw-bold mt-2">
            Enviar
          </button>
        </form>

        <div
          className="
          infoContato
          col
          text-white
          bg-dark
          rounded-3
          text-center
          border border-danger
        "
        >
          <h2 className="titleContato mt-2">Entre em contato</h2>
          <i className="bi bi-geo-alt">
            <span className="lead fw-bold"> Endereço:</span>
          </i>
          <span>Rua Inexistência 01, Bairro Vazio - Nenhum - Brasil</span>
          <i className="bi bi-telephone">
            <span className="lead fw-bold"> Telefone:</span>
          </i>
          <span>+55 (00) 99999-9999</span>
          <i className="bi bi-envelope">
            <span className="lead fw-bold"> Email:</span>
          </i>
          <span>atendimento@pwnwatcher.net</span>
        </div>
      </div>
    </main>
  );
}

export default Contato;
