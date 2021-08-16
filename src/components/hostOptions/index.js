import React from "react";
import "./hostOptions.css";


function HostOptions({ id }) {

    return (
        <>

            <div className="dropdown dropstart">
                <button className="btn btn-dark btnOpcoes" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <i className="bi bi-three-dots"></i>
                </button>
                <ul className="dropdown-menu" aria-labelledby="btnOpcoes">
                    <li>
                        <a className="dropdown-item">Editar</a>
                    </li>
                    <li>
                        <a className="dropdown-item">Remover</a>
                    </li>
                </ul>
            </div>

        </>
    )
}

export default HostOptions;