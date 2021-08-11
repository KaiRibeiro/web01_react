import React from "react";
import "./hosts.css";
import Sidebar from "../../components/sidebar";
import Cabecalho from "../../components/cabecalho";
import NewHost from "../../components/newHost";
import HostsList from "../../components/hostslist";

function Hosts() {

    return (
        <>

            <div className="cu">
                <Sidebar />
                <Cabecalho />
                <NewHost/>
                <HostsList/>
            </div>

        </>
    )
}

export default Hosts;