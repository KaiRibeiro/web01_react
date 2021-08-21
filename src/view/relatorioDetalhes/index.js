import React, { useState, useEffect } from "react";
import firebase from '../../config/firebase'
import "./relatorioDetalhes.css";
import Sidebar from "../../components/sidebar";
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Cabecalho from "../../components/cabecalho";

function RelatorioDetalhes({ match }) {
    const [relatorio, setRelatorio] = useState();
    const [carregando, setCarregando] = useState(1);

    useEffect(() => {
        firebase.firestore().collection('relatorios').doc(match.params.idRelatorio).get().then((resultado) => {
            setRelatorio(resultado.data());
            setCarregando(0);
        })
    }, [match]);

    return (
        <>

            {
                useSelector(state => state.usuarioLogado === 0 ? <Redirect to="/login" /> : null)
            }

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
                            <h1 className="hostTitle">{relatorio.nomeRelatorio}</h1>
                            <h2 className="lead text-white">HOST: {relatorio.hostRelatorio}</h2>
                            <h2 className="lead text-white">{relatorio.status}</h2>
                            <div className="row">
                                <div className="descricao col">
                                    <h3 className="descTitle text-white">RESUMO DO RELATÓRIO</h3>
                                    <p className="text-white">
                                        {relatorio.resuRelatorio}
                                    </p>
                                </div>
                                <div className="vulnerabilidade col">
                                    <h3 className="vulnTitle text-white">INDICAÇÕES</h3>
                                    <p className="text-white">
                                        {relatorio.indiRelatorio}
                                    </p>
                                </div>
                            </div>
                        </div>
                }
            </div>

        </>
    )
}

export default RelatorioDetalhes;