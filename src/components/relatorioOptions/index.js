import React from "react";
import "./relatorioOptions.css";
import NewRelatorio from "../../components/newRelatorio";
import firebase from '../../config/firebase'



function RelatorioOptions({ id }) {

    function remover() {
        firebase.firestore().collection('relatorios').doc(id).delete();
    }

    return (
        <>

            <button className="btn btn-dark btnOpcoes" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                <i className="bi bi-three-dots"></i>
            </button>
            <ul className="dropdown-menu" aria-labelledby="btnOpcoes">
                <li>
                    <ul className="dropdown-item">
                        <button className="btn btn-outline-dark btnRemove w-100" type="button">
                            Gerar
                        </button>
                    </ul>
                </li>
                <li>
                    <ul><NewRelatorio id={id} edit={true} /></ul>
                </li>
                <li>
                    <ul className="dropdown-item">
                        <button className="btn btn-outline-dark btnRemove w-100" type="button" onClick={remover}>
                            Remover
                        </button>
                    </ul>
                </li>
            </ul>

        </>
    )
}

export default RelatorioOptions;