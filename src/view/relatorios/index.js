import React from "react";
import "./relatorios.css";
import Sidebar from "../../components/sidebar";
import Cabecalho from "../../components/cabecalho";
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import NewRelatorio from "../../components/newRelatorio";

function Relatorios({ match }) {

    return (
        <>

            {
                useSelector(state => state.usuarioLogado === 0 ? <Redirect to="/login" /> : null)
            }
            <div>
                <Sidebar />
                <Cabecalho />
                <NewRelatorio edit={false} />
            </div>

        </>
    )
}

export default Relatorios;