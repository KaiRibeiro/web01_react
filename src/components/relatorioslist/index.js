import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import Table from "react-bootstrap/Table"
import "./relatoriosList.css";
import firebase from '../../config/firebase'
import { Link } from "react-router-dom";
import RelatorioOptions from "../relatorioOptions";


function RelatoriosList({ param }) {

    const [relatorios, setRelatorios] = useState([]);
    const [pesquisa, setPesquisa] = useState('');
    const usuarioEmail = useSelector(state => state.usuarioEmail);

    var listaRelatorios = [];

    useEffect(() => {

        if (param) {
            firebase.firestore().collection('relatorios').where('usuario', '==', usuarioEmail).get().then(async (resultado) => {
                await resultado.docs.forEach(doc => {
                    if (doc.data().nomeRelatorio.indexOf(pesquisa) >= 0) {
                        listaRelatorios.push({
                            id: doc.id,
                            ...doc.data()
                        })
                    }
                })

                setRelatorios(listaRelatorios);
            })
        } else {
            firebase.firestore().collection('relatorios').get().then(async (resultado) => {
                await resultado.docs.forEach(doc => {
                    if (doc.data().nomeRelatorio.indexOf(pesquisa) >= 0) {
                        listaRelatorios.push({
                            id: doc.id,
                            ...doc.data()
                        })
                    }
                })

                setRelatorios(listaRelatorios);
            })
        }
    });

    return (
        <>
            <div>
                <input type="text" onChange={(e) => setPesquisa(e.target.value)} className="form-control mt-3 mb-3 text-center" placeholder="Pesquisar relatórios pelo título..."></input>
            </div>
            <Table striped bordered hover variant="dark" className="text-center">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Host</th>
                        <th>Status</th>
                        <th>Última Modificação</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        relatorios.map(item =>
                            <tr key={item.id}>
                                <td>
                                    <Link to={`/relatoriodetalhes/${item.id}`}><button className="btn btn btn-dark btnDetalhes">{item.nomeRelatorio}</button></Link>
                                </td>
                                <td>
                                    {item.hostRelatorio}
                                </td>
                                <td>
                                    {item.status}
                                </td>
                                <td>
                                    {item.ultimaModificacao.toDate().toLocaleDateString()}
                                </td>
                                <td>
                                    <RelatorioOptions id={item.id} />
                                </td>
                            </tr>
                        )
                    }

                </tbody>
            </Table>
        </>
    )
}

export default RelatoriosList;