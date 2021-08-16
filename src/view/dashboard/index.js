import React from 'react';
import './dashboard.css';
import Sidebar from '../../components/sidebar'
import Cabecalho from '../../components/cabecalho';

function Home() {
    return (
        <main>
            <div className="conteudo row justify-content-md-center">
                <Sidebar/>
                <Cabecalho />
                <div className="cardsHosts col">
                    <div className="card text-center">
                        <div className="card-header h2">Hosts</div>
                        <div className="card-body">
                            <h4>Total</h4>
                            <h5 className="text-primary">34</h5>
                            <hr />
                            <h4>Abertos</h4>
                            <div>
                                <div className="progress">
                                    <div className="progress-bar bg-danger" role="progressbar" aria-valuenow="12"
                                        aria-valuemin="0" aria-valuemax="34"></div>
                                </div>
                                <div>
                                    <span className="text1">12 <span className="text2">de 34 hosts</span></span>
                                </div>
                                <hr />
                            </div>
                            <h4>Finalizados</h4>
                            <div>
                                <div className="progress">
                                    <div className="progress-bar bg-success" role="progressbar" aria-valuenow="12"
                                        aria-valuemin="0" aria-valuemax="34"></div>
                                </div>
                                <div>
                                    <span className="text1">22 <span className="text2">de 34 hosts</span></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="cardsRelatorios col">
                    <div className="card text-center">
                        <div className="card-header h2">Relatórios</div>
                        <div className="card-body">
                            <h4>Total</h4>
                            <h5 className="text-primary">22</h5>
                            <hr />
                            <h4>Aguardando Geração</h4>
                            <div>
                                <div className="progress">
                                    <div className="progress-bar bg-warning" role="progressbar" aria-valuenow="9"
                                        aria-valuemin="0" aria-valuemax="22"></div>
                                </div>
                                <div>
                                    <span className="text1">9 <span className="text2">de 22 relatórios</span></span>
                                </div>
                                <hr />
                            </div>
                            <h4>Gerados</h4>
                            <div>
                                <div className="progress">
                                    <div className="progress-bar bg-success" role="progressbar" aria-valuenow="12"
                                        aria-valuemin="0" aria-valuemax="34"></div>
                                </div>
                                <div>
                                    <span className="text1">13 <span className="text2">de 22 relatórios</span></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Home;