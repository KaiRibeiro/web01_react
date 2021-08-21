import React, { useState } from "react";
import "./newRelatorio.css";
import firebase from '../../config/firebase'
import { useSelector } from 'react-redux';

import Modal from "react-bootstrap/Modal";

function NewRelatorio({ id, edit }) {




    const [show, setShow] = useState(false);
    const [carregando, setCarregando] = useState();


    const handleClose = () => setShow(false);


    const [msgTipo, setMsgTipo] = useState();

    const [nomeRelatorio, setNomeRelatorio] = useState();
    const [hostRelatorio, setHostRelatorio] = useState();
    const [resuRelatorio, setResuRelatorio] = useState();
    const [indiRelatorio, setindiRelatorio] = useState();
    const [pesquisa] = useState('');
    const [hosts, setHosts] = useState([]);



    const usuarioEmail = useSelector(state => state.usuarioEmail);
    const db = firebase.firestore();


    var listaHosts = [];

    function getHosts() {

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

    };



    function getRelatorio() {
        setCarregando(1);
        firebase.firestore().collection('relatorios').doc(id).get().then((resultado) => {
            setNomeRelatorio(resultado.data().nomeRelatorio);
            setHostRelatorio(resultado.data().hostRelatorio);
            setResuRelatorio(resultado.data().resuRelatorio);
            setindiRelatorio(resultado.data().indiRelatorio);
        }).then(() => {
            setCarregando(0);
        }).catch(() => {
            setCarregando(0);
        })
    }

    function abrirEditar() {
        getHosts();
        getRelatorio();
        setShow(true);
    }

    function abrirNormal() {
        getHosts();
        setShow(true);
    }


    function editar() {
        setCarregando(1);
        db.collection('relatorios').doc(id).update({
            nomeRelatorio: nomeRelatorio,
            hostRelatorio: hostRelatorio,
            resuRelatorio: resuRelatorio,
            indiRelatorio: indiRelatorio,
            ultimaModificacao: new Date(),
            status: 'Aguardando Geração',
            usuario: usuarioEmail
        }).then(() => {
            setCarregando(0);
            setShow(false);
            setMsgTipo('ok');
        }).catch(() => {
            setCarregando(0);
            setShow(false);
            setMsgTipo('erro');
        });
    }


    function cadastrar() {
        setCarregando(1);
        db.collection('relatorios').add({
            nomeRelatorio: nomeRelatorio,
            hostRelatorio: hostRelatorio,
            resuRelatorio: resuRelatorio,
            indiRelatorio: indiRelatorio,
            ultimaModificacao: new Date(),
            status: 'Aguardando Geração',
            usuario: usuarioEmail
        }).then(() => {
            setCarregando(0);
            setShow(false);
            setMsgTipo('ok');
        }).catch(() => {
            setCarregando(0);
            setShow(false);
            setMsgTipo('erro');
        });
    }


    return (
        <main>

            <div className="justify-content-md-center">
                {
                    edit ?
                        <button className="btn btn-outline-dark btnEdit" type="button" onClick={abrirEditar}>
                            Editar
                        </button>
                        :
                        <button type="button" id="btnNovoHost" className="btn btn-lg text-white fw-bold" onClick={abrirNormal}>
                            + Novo Relatório
                        </button>
                }

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            {
                                edit ?
                                    <h2 className="fw-bold">Editar Relatório</h2>
                                    :
                                    <h2 className="fw-bold">Novo Relatório</h2>
                            }
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {
                            carregando ? <div className="spinner-border text-danger" role="status">
                                <span className="sr-only"></span>
                            </div> :
                                <form>
                                    <div className="form-group mb-3">
                                        <label htmlffor="iptNomeRelatorio" className="fw-bold">Nome do Relatório<span className="text-danger"> *</span></label>
                                        <input onChange={(e) => setNomeRelatorio(e.target.value)} id="iptNomeRelatorio" type="text" className="form-control" placeholder="Exemplo Nome..." maxLength="40"
                                            required value={nomeRelatorio} />
                                        <label htmlffor="iptNomeRelatorio" className="tmMax text-danger">Max. Caracteres 40</label>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label htmlffor="selHost" className="fw-bold">Host</label>
                                            <select onChange={(e) => setHostRelatorio(e.target.value)} className="form-select" id="selHost" defaultValue={hostRelatorio}>
                                                <option disabled selected>Selecionar...</option>
                                                {
                                                    hosts.map(item =>
                                                        <option>{item.nomeHost}</option>
                                                    )
                                                }
                                            </select>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label htmlffor="txtResuRelatorio" className="fw-bold">Resumo</label>
                                        <textarea onChange={(e) => setResuRelatorio(e.target.value)} className="form-control" id="txtDescriHost" rows="3" maxLength="500"
                                            placeholder="Resumo..." value={resuRelatorio}></textarea>
                                        <label htmlffor="txtResuRelatorio" className="tmMax text-danger">Max. Caracteres 500</label>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label htmlFor="txtIndica" className="fw-bold">Indicações</label>
                                        <textarea onChange={(e) => setindiRelatorio(e.target.value)} className="form-control" id="txtIndica" rows="3" maxLength="500"
                                            placeholder="Indicações..." value={indiRelatorio}></textarea>
                                        <label htmlFor="txtDescriVuln" className="tmMax text-danger">Max. Caracteres 500</label>
                                    </div>
                                </form>
                        }
                    </Modal.Body>
                    <Modal.Footer>
                        {
                            edit ? <button type="button" className="btn btn-danger fw-bold btnSalvar" onClick={editar}>Editar</button>
                                :
                                <button type="button" className="btn btn-danger fw-bold btnSalvar" onClick={cadastrar}>+ Salvar</button>
                        }
                    </Modal.Footer>
                </Modal>
            </div>
        </main>
    )
}

export default NewRelatorio;