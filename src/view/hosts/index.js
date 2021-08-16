import React from "react";
import "./hosts.css";
import Sidebar from "../../components/sidebar";
import Cabecalho from "../../components/cabecalho";
import NewHost from "../../components/newHost";
import HostsList from "../../components/hostslist";

function Hosts({ match }) {

    return (
        <>
            <div>
                <Sidebar />
                <Cabecalho />
                <NewHost/>
                <HostsList param = {match.params.parametro}/>
            </div>

        </>
    )
}

export default Hosts;