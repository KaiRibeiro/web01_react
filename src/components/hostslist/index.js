import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table"
import HostOptions from "../hostOptions";
import "./hostsList.css";
import firebase from '../../config/firebase'

function HostsList() {

    const [hosts, setHosts] = useState([]);
    var listaHosts = [];

    useEffect(() => {
        firebase.firestore().collection('hosts').get().then(async (resultado) => {
            await resultado.docs.forEach(doc => {
                listaHosts.push({
                    id: doc.id,
                    ...doc.data()
                })
            })

            setHosts(listaHosts);
        })
    });

    return (
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
                                {item.nomeHost}
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
                                <HostOptions />
                            </td>
                        </tr>
                    )
                }

            </tbody>
        </Table>
    )
}

export default HostsList;