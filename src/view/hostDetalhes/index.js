import React, { useState, useEffect } from "react";
import firebase from '../../config/firebase'
import "./hostDetalhes.css";
import Sidebar from "../../components/sidebar";
import Cabecalho from "../../components/cabecalho";

function HostDetalhes({ match }) {
    const [host, setHost] = useState();
    const [carregando, setCarregando] = useState(1);

    useEffect(() => {
        firebase.firestore().collection('hosts').doc(match.params.idHost).get().then((resultado) => {
            setHost(resultado.data());
            setCarregando(0);
        })
    });

    return (
        <>

            <div>
                <Sidebar />
                <Cabecalho />
                {
                    carregando ? <div>
                        <div className="spinner-border text-danger" role="status">
                            <span className="sr-only"></span>
                        </div>
                    </div> :

                        <div className="text-center bg-dark border border-danger p-3">
                            <h1 className="hostTitle">{host.nomeHost}</h1>
                            <h2 className="lead text-white">{host.sistemaOp}</h2>
                            <h2 className="lead text-white">{host.status}</h2>
                            <div className="row">
                                <div className="descricao col">
                                    <h3 className="descTitle text-white">DESCRIÇÃO</h3>
                                    <p className="text-white">
                                        {host.descricaoHost}
                                    </p>
                                </div>
                                <div className="vulnerabilidade col">
                                    <h3 className="vulnTitle text-white">VULNERABILIDADE</h3>
                                    <h4 className="text-white lead">{host.vulnHost} <span> | Severidade:</span> <span className="severidade">{host.vulnSeveridade}</span></h4>
                                    <p className="text-white">
                                        {host.descricaoVuln}
                                    </p>
                                </div>
                            </div>
                        </div>
                }
            </div>

        </>
    )
}

export default HostDetalhes;