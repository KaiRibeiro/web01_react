import React, {useState} from 'react';
import './sidebar.css'
import { Link } from 'react-router-dom';
import perfil from '../../assets/img/usuario.webp'

function Sidebar() {
  const [encolhido, setEncolhido] = useState();

  function encolher() {
    setEncolhido(!encolhido);
  }

    return (
      <>
          <div className={encolhido ? "sidebarEncolhida border border-danger" : "sidebar border border-danger"}>
            <i className="bi bi-list" id="btnSidebarMenu" onClick={encolher}></i>
          <div className="container_imagem">
            <img src={perfil} className="imgPerfil" alt="Foto de perfil do Usuário" />
            <h4>Kaique C.</h4>
          </div>
          <Link to='/'><i className="bi bi-columns"></i><span>Dashboard</span></Link>
          <Link to='/hosts/meus'><i className="bi bi-laptop"></i><span>Hosts</span></Link>
          <Link to='/relatorios'><i className="bi bi-clipboard"></i><span>Relatórios</span></Link>
          <Link to='/contato'><i className="bi bi-envelope"></i><span>Contato</span></Link>
        </div>
      </>
    )
}

export default Sidebar;