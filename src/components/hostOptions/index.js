import React from "react";
import "./hostOptions.css";
import NewHost from "../../components/newHost";
import firebase from '../../config/firebase'



function HostOptions({ id }) {

    function remover() {
        firebase.firestore().collection('hosts').doc(id).delete();
    }

    return (
        <>

            <button className="btn btn-dark btnOpcoes" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                <i className="bi bi-three-dots"></i>
            </button>
            <ul className="dropdown-menu" aria-labelledby="btnOpcoes">
                <li>
                    <ul><NewHost id={id} edit={true} /></ul>
                </li>
                <li>
                    <ul className="dropdown-item">
                        <button className="btn btn-outline-dark btnRemove" type="button" onClick={remover}>
                         Remover
                        </button>
                    </ul>
                </li>
            </ul>

        </>
    )
}

export default HostOptions;