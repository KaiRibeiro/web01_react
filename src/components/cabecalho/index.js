import React, { useState } from 'react';
import './cabecalho.css'
import { Link } from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';



function Cabecalho() {

  const dispatch = useDispatch();


  function logout() {
    dispatch({type: 'LOGOUT'})
  }

  return (
    <header className="bg-dark border border-danger">
      <div className="area_esquerda">
        <h3>pwn<span>Watcher</span></h3>
      </div>
      <div className="area_direita">
        <button className="btn btnSair" onClick={logout}>Sair</button>
      </div>
    </header>
  )
}

export default Cabecalho;