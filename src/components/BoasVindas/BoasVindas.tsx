import { type JSX } from "react";

function BoasVindas(): JSX.Element {
    return (
        <section style={{ padding: '48px 16px' }}>
            <div style={{ maxWidth: 1100, margin: '0 auto', textAlign: 'center' }}>
                <h1 style={{ fontSize: '2.4rem', margin: '24px 0 12px', color: 'var(--text-h)' }}>Loja de Informática Infotech</h1>
                <p style={{ fontSize: '1.05rem', color: 'var(--text)', margin: '0 auto', maxWidth: 780 }}>
                    Seja bem-vindo à loja de informática Infotech. Aqui você encontra produtos de alta qualidade e serviços excepcionais.
                </p>
            </div>
        </section>
    );
}

export default BoasVindas;