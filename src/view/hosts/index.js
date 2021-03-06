import React from "react";
import "./hosts.css";
import Sidebar from "../../components/sidebar";
import Cabecalho from "../../components/cabecalho";
import NewHost from "../../components/newHost";
import HostsList from "../../components/hostslist";
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

function Hosts({ match }) {

    return (
        <>

            {
                useSelector(state => state.usuarioLogado === 0 ? <Redirect to="/login" /> : null)
            }
            <div>
                <Sidebar />
                <Cabecalho />
                <NewHost edit={false} />
                <HostsList param={match.params.parametro} />
            </div>

        </>
    )
}

export default Hosts;