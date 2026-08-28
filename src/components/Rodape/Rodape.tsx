import { type JSX } from "react";
import "./Rodape.css";

function Rodape(): JSX.Element {
    return (
        <footer className="rodape-container">
            <div className="rodape-content">
                {/* Lado Esquerdo: Marca */}
                <div className="rodape-info">
                    <h3>
                        <i className="pi pi-heart-fill" style={{ color: '#ffb347' }}></i>
                        Bem-vindo a <span style={{ color: '#2563eb', fontWeight: 700 }}> + Informática</span>
                    </h3>
                    <p>
                        Produtos de informática de alta qualidade, com atendimento <strong>presenciais e por vídeo</strong> com total segurança.
                    </p>
                </div>

                {/* Centro: Equipe de Desenvolvimento */}
                <div className="rodape-links">
                    <h4>Desenvolvido por</h4>
                    <div className="equipe-lista">
                        
                        <span>Beatriz</span> •
                       
                    </div>
                </div>

                {/* Lado Direito: Localização */}
                <div className="rodape-links">
                    <h4>Localização</h4>
                    <p className="rodape-equipe">
                        <i className="pi pi-map-marker"></i> Sertãozinho - SP
                    </p>
                    <div className="social-icons">
                        <i className="pi pi-instagram"></i>
                        <i className="pi pi-linkedin"></i>
                        <i className="pi pi-facebook"></i>
                    </div>
                </div>
            </div>

            {/* Faixa de Copyright Final */}
            <div className="rodape-bottom">
                <p>© 2026 + Informática - Rede de informática.</p>
                <p>Versão 1.0.2</p>
            </div>
        </footer>
    );
}

export default Rodape;