import React, { useState } from 'react';
import './cabecalho.css'
import { Link } from 'react-router-dom';

function Cabecalho() {

  return (
    <header className="bg-dark border border-danger">
      <div className="area_esquerda">
        <h3>pwn<span>Watcher</span></h3>
      </div>
      <div className="area_direita">
        <Link to='/login' className="btnSair">Sair</Link>
      </div>
    </header>
  )
}

export default Cabecalho;