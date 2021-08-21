import React, { useState } from "react";
import "./newRelatorio.css";
import firebase from '../../config/firebase'
import { useSelector } from 'react-redux';

import Modal from "react-bootstrap/Modal";

function NewRelatorio({ id, edit }) {




    const [show, setShow] = useState(false);
    const [carregando, setCarregando] = useState();


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [msgTipo, setMsgTipo] = useState();

    const [nomeHost, setNomeHost] = useState();
    const [sistemaOp, setSistemaOp] = useState();
    const [descricaoHost, setDescricaoHost] = useState();
    const [vulnHost, setVulnHost] = useState();
    const [descricaoVuln, setDescricaoVuln] = useState();
    const [vulnSeveridade, setVulnSeveridade] = useState();
    const usuarioEmail = useSelector(state => state.usuarioEmail);
    const db = firebase.firestore();




    function getHost() {
        setCarregando(1);
        firebase.firestore().collection('hosts').doc(id).get().then((resultado) => {
            setNomeHost(resultado.data().nomeHost);
            setSistemaOp(resultado.data().sistemaOp);
            setDescricaoHost(resultado.data().descricaoHost);
            setVulnHost(resultado.data().vulnHost);
            setDescricaoVuln(resultado.data().descricaoVuln);
            setVulnSeveridade(resultado.data().vulnSeveridade);
        }).then(() => {
            setCarregando(0);
        }).catch(() => {
            setCarregando(0);
        })
    }

    function abrirEditar() {
        getHost();
        setShow(true);
    }


    function editar() {
        setCarregando(1);
        db.collection('hosts').doc(id).update({
            nomeHost: nomeHost,
            sistemaOp: sistemaOp,
            descricaoHost: descricaoHost,
            vulnHost: vulnHost,
            descricaoVuln: descricaoVuln,
            vulnSeveridade: vulnSeveridade,
            ultimaModificacao: new Date(),
            status: 'Aberto',
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
            nomeHost: nomeHost,
            sistemaOp: sistemaOp,
            descricaoHost: descricaoHost,
            vulnHost: vulnHost,
            descricaoVuln: descricaoVuln,
            vulnSeveridade: vulnSeveridade,
            ultimaModificacao: new Date(),
            status: 'Aberto',
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
                        <button type="button" id="btnNovoHost" className="btn btn-lg text-white fw-bold" onClick={handleShow}>
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
                                        <input onChange={(e) => setNomeHost(e.target.value)} id="iptNomeRelatorio" type="text" className="form-control" placeholder="Exemplo Nome..." maxLength="40"
                                            required value={nomeHost} />
                                        <label htmlffor="iptNomeRelatorio" className="tmMax text-danger">Max. Caracteres 40</label>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label htmlffor="selHost" className="fw-bold">Host</label>
                                            <select onChange={(e) => setVulnHost(e.target.value)} className="form-select" id="selHost" defaultValue={vulnHost}>
                                                <option disabled selected>Selecionar...</option>
                                                <option>Host ...</option>
                                            </select>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label htmlffor="txtResuRelatorio" className="fw-bold">Resumo</label>
                                        <textarea onChange={(e) => setDescricaoHost(e.target.value)} className="form-control" id="txtDescriHost" rows="3" maxLength="500"
                                            placeholder="Resumo..." value={descricaoHost}></textarea>
                                        <label htmlffor="txtResuRelatorio" className="tmMax text-danger">Max. Caracteres 500</label>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label htmlFor="txtIndica" className="fw-bold">Indicações</label>
                                        <textarea onChange={(e) => setDescricaoVuln(e.target.value)} className="form-control" id="txtIndica" rows="3" maxLength="500"
                                            placeholder="Indicações..." value={descricaoVuln}></textarea>
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