import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthRequests from '../../../fetch/AuthRequest';

function LoginForm(): React.ReactNode {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    interface LoginData {
        email: string;
        senha: string;
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const login: LoginData = { email, senha };

        try {
            const result = await AuthRequests.login(login);
            if (result.success) {
                window.location.href = '/';
                return;
            }

            alert(`Falha no login: ${result.message || 'e-mail ou senha inválidos, ou servidor indisponível.'}`);
        } catch (error) {
            console.error(`Erro ao tentar fazer login: ${error}`);
            const message = error instanceof Error ? error.message : 'Erro ao fazer login';
            alert(`Falha no login: ${message}`);
        }
    };

    return (
        <div className="auth-wrapper">
            <div className="auth-card">
                <div className="auth-logo">
                    <span className="brand-blue">InfoTech</span>
                    <span className="brand-green">+</span>
                </div>

                <div className="auth-title">
                    <h2>Área do cliente</h2>
                    <p className="auth-sub">Bem-vindo de volta! Acesse sua conta.</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label" htmlFor="email">E-mail</label>
                        <input
                            id="email"
                            className="form-input"
                            type="email"
                            placeholder="exemplo@email.com"
                            value={email}
                            autoComplete="email"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <div className="form-row">
                            <label className="form-label" htmlFor="senha">Senha</label>
                            <Link className="link-secondary" to="/recuperar-senha">
                                Esqueci minha senha
                            </Link>
                        </div>
                        <input
                            id="senha"
                            className="form-input"
                            type="password"
                            placeholder="Sua senha segura"
                            value={senha}
                            autoComplete="current-password"
                            onChange={(e) => setSenha(e.target.value)}
                            required
                        />
                    </div>

                    <button className="btn-primary" type="submit">
                        Entrar na sua conta
                    </button>
                </form>

                <p className="muted">
                    Ainda não tem conta?{' '}
                    <Link className="cta" to="/cadastro">
                        Cadastre-se grátis
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default LoginForm;