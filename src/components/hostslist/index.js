import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import Table from "react-bootstrap/Table"
import HostOptions from "../hostOptions";
import "./hostsList.css";
import firebase from '../../config/firebase'
import { Link } from "react-router-dom";


function HostsList({ param }) {

    const [hosts, setHosts] = useState([]);
    const [pesquisa, setPesquisa] = useState('');
    const usuarioEmail = useSelector(state => state.usuarioEmail);

    var listaHosts = [];

    useEffect(() => {

        if (param) {
            firebase.firestore().collection('hosts').where('usuario', '==', usuarioEmail).get().then(async (resultado) => {
                await resultado.docs.forEach(doc => {
                    if (doc.data().nomeHost.indexOf(pesquisa) >= 0) {
                        listaHosts.push({
                            id: doc.id,
                            ...doc.data()
                        })
                    }
                })

                setHosts(listaHosts);
            })
        } else {
            firebase.firestore().collection('hosts').get().then(async (resultado) => {
                await resultado.docs.forEach(doc => {
                    if (doc.data().nomeHost.indexOf(pesquisa) >= 0) {
                        listaHosts.push({
                            id: doc.id,
                            ...doc.data()
                        })
                    }
                })

                setHosts(listaHosts);
            })
        }
    });

    return (
        <>
            <div>
                <input type="text" onChange={(e) => setPesquisa(e.target.value)} className="form-control mt-3 mb-3 text-center" placeholder="Pesquisar hosts pelo título..."></input>
            </div>
            <Table striped bordered hover variant="dark" className="text-center">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Sistema</th>
                        <th>Status</th>
                        <th>Última Modificação</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        hosts.map(item =>
                            <tr key={item.id}>
                                <td>
                                    <Link to={`/hostdetalhes/${item.id}`}><button className="btn btn btn-dark btnDetalhes">{item.nomeHost}</button></Link>
                                </td>
                                <td>
                                    {item.sistemaOp}
                                </td>
                                <td>
                                    {item.status}
                                </td>
                                <td>
                                    {item.ultimaModificacao.toDate().toLocaleDateString()}
                                </td>
                                <td>
                                    <HostOptions id={item.id} />
                                </td>
                            </tr>
                        )
                    }

                </tbody>
            </Table>
        </>
    )
}

export default HostsList;