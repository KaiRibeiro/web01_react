import React, { useState } from "react";
import "./newHost.css";
import firebase from '../../config/firebase'
import { useSelector, useDispatch } from 'react-redux';
import Modal from "react-bootstrap/Modal";

function NewHost() {




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
        <>


            <button type="button" id="btnNovoHost" className="btn btn-lg text-white fw-bold" onClick={handleShow}>
                + Novo Host
            </button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <h2 className="fw-bold">Novo Host</h2>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="form-group mb-3">
                            <label htmlFor="iptNomeHost" className="fw-bold">Nome do Host<span className="text-danger"> *</span></label>
                            <input onChange={(e) => setNomeHost(e.target.value)} id="iptNomeHost" type="text" className="form-control" placeholder="Exemplo Nome..." maxLength="40"
                                required />
                            <label htmlFor="iptNomeHost" className="tmMax text-danger">Max. Caracteres 40</label>
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="iptSoHost" className="fw-bold">Sistema Operacional<span className="text-danger"> *</span></label>
                            <input onChange={(e) => setSistemaOp(e.target.value)} id="iptSoHost" type="text" className="form-control" placeholder="Linux..." maxLength="40" required />
                            <label htmlFor="iptSoHost" className="tmMax text-danger">Max. Caracteres 40</label>
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="txtDescriHost" className="fw-bold">Descrição</label>
                            <textarea onChange={(e) => setDescricaoHost(e.target.value)} className="form-control" id="txtDescriHost" rows="3" maxLength="500"
                                placeholder="Descrição do host..."></textarea>
                            <label htmlFor="txtDescriHost" className="tmMax text-danger">Max. Caracteres 500</label>
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFfor="selVulne" className="fw-bold">Vulnerabilidade</label>
                            <select onChange={(e) => setVulnHost(e.target.value)} className="form-select" id="selVulne">
                                <option disabled selected value>Selecionar...</option>
                                <option>Software Desatualizado</option>
                                <option>Configuração Incorreta</option>
                                <option>Credencias Fracas</option>
                                <option>Phishing</option>
                                <option>Agente Interno</option>
                                <option>Outro</option>
                            </select>
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="txtDescriVuln" className="fw-bold">Descrição da Vulnerabilidade</label>
                            <textarea onChange={(e) => setDescricaoVuln(e.target.value)} className="form-control" id="txtDescriVuln" rows="3" maxLength="500"
                                placeholder="Descrição Da Vulnerabilidade..."></textarea>
                            <label htmlFor="txtDescriVuln" className="tmMax text-danger">Max. Caracteres 500</label>
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFfor="selSev" className="fw-bold">Severidade da Vulnerabilidade</label>
                            <select onChange={(e) => setVulnSeveridade(e.target.value)} className="form-select" id="selSev">
                                <option disabled selected value>Selecionar...</option>
                                <option className="bg-secondary">N/A</option>
                                <option className="bg-success">Baixa</option>
                                <option className="bg-warning">Média</option>
                                <option className="bg-danger">Alta</option>
                            </select>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    {
                        carregando ? <div class="spinner-border text-danger" role="status">
                            <span class="sr-only"></span>
                        </div>
                            : <button type="button" className="btn btn-danger fw-bold btnSalvar" onClick={cadastrar}>+ Salvar</button>
                    }
                </Modal.Footer>
            </Modal>


            <div className="alertaSucesso">
                {msgTipo === "ok" && (
                    <div
                        className="alert alert-success d-flex align-items-center"
                        role="alert"
                    >
                        <i className="bi bi-check2"></i>
                        <span>Host cadastrado com sucesso!</span>
                    </div>
                )}
            </div>

            <div>
                {msgTipo === "erro" && (
                    <div
                        className="alert alert-danger d-flex align-items-center"
                        role="alert"
                    >
                        <i className="bi bi-exclamation-triangle-fill"></i>
                        <span>
                            <strong> Oops!! </strong>
                            Ocorreu um erro ao cadastrar novo host.
                        </span>
                    </div>
                )}
            </div>


        </>
    )
}

export default NewHost;