import React, { useState } from "react";
import "./newHost.css";
import firebase from '../../config/firebase'
import { useSelector } from 'react-redux';

import Modal from "react-bootstrap/Modal";

function NewHost({ id, edit }) {




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
        db.collection('hosts').add({
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
                            + Novo Host
                        </button>
                }

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            {
                                edit ?
                                    <h2 className="fw-bold">Editar Host</h2>
                                    :
                                    <h2 className="fw-bold">Novo Host</h2>
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
                                        <label htmlffor="iptNomeHost" className="fw-bold">Nome do Host<span className="text-danger"> *</span></label>
                                        <input onChange={(e) => setNomeHost(e.target.value)} id="iptNomeHost" type="text" className="form-control" placeholder="Exemplo Nome..." maxLength="40"
                                            required value={nomeHost} />
                                        <label htmlffor="iptNomeHost" className="tmMax text-danger">Max. Caracteres 40</label>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label htmlffor="iptSoHost" className="fw-bold">Sistema Operacional<span className="text-danger"> *</span></label>
                                        <input onChange={(e) => setSistemaOp(e.target.value)} id="iptSoHost" type="text" className="form-control" placeholder="Linux..." maxLength="40" required value={sistemaOp} />
                                        <label htmlffor="iptSoHost" className="tmMax text-danger">Max. Caracteres 40</label>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label htmlffor="txtDescriHost" className="fw-bold">Descri????o</label>
                                        <textarea onChange={(e) => setDescricaoHost(e.target.value)} className="form-control" id="txtDescriHost" rows="3" maxLength="500"
                                            placeholder="Descri????o do host..." value={descricaoHost}></textarea>
                                        <label htmlffor="txtDescriHost" className="tmMax text-danger">Max. Caracteres 500</label>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label htmlffor="selVulne" className="fw-bold">Vulnerabilidade</label>
                                        <select onChange={(e) => setVulnHost(e.target.value)} className="form-select" id="selVulne" defaultValue={vulnHost}>
                                            <option disabled selected>Selecionar...</option>
                                            <option>Software Desatualizado</option>
                                            <option>Configura????o Incorreta</option>
                                            <option>Credencias Fracas</option>
                                            <option>Phishing</option>
                                            <option>Agente Interno</option>
                                            <option>Outro</option>
                                        </select>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label htmlFor="txtDescriVuln" className="fw-bold">Descri????o da Vulnerabilidade</label>
                                        <textarea onChange={(e) => setDescricaoVuln(e.target.value)} className="form-control" id="txtDescriVuln" rows="3" maxLength="500"
                                            placeholder="Descri????o Da Vulnerabilidade..." value={descricaoVuln}></textarea>
                                        <label htmlFor="txtDescriVuln" className="tmMax text-danger">Max. Caracteres 500</label>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label htmlffor="selSev" className="fw-bold">Severidade da Vulnerabilidade</label>
                                        <select onChange={(e) => setVulnSeveridade(e.target.value)} className="form-select" id="selSev" defaultValue={vulnSeveridade}>
                                            <option disabled selected>Selecionar...</option>
                                            <option className="bg-secondary">N/A</option>
                                            <option className="bg-success">Baixa</option>
                                            <option className="bg-warning">M??dia</option>
                                            <option className="bg-danger">Alta</option>
                                        </select>
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

export default NewHost;