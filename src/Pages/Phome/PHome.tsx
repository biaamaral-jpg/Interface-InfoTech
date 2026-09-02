import type { JSX } from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BoasVindas from "../../components/BoasVindas/BoasVindas";
import Navegacao from "../../components/Navegacao/Navegacao";
import Rodape from "../../components/Rodape/Rodape";
import AuthRequests from "../../fetch/AuthRequest";
import ProdutoRequests from "../../fetch/ProdutoRequest";
import type { ProdutoDTO } from "../../dto/ProdutoDTO";

function PHome(): JSX.Element {
    const [produtos, setProdutos] = useState<ProdutoDTO[]>([]);
    const [carregando, setCarregando] = useState(false);

    const isAuthenticated = (() => {
        const isAuth = localStorage.getItem('isAuth');
        const token = localStorage.getItem('token');
        return !!(isAuth && token && AuthRequests.checkTokenExpiry());
    })();

    useEffect(() => {
        if (!isAuthenticated) return;

        const carregarProdutos = async () => {
            setCarregando(true);
            try {
                const resposta = await ProdutoRequests.listar();
                setProdutos(Array.isArray(resposta) ? resposta : []);
            } catch (error) {
                console.error('Erro ao carregar produtos da home:', error);
                setProdutos([]);
            } finally {
                setCarregando(false);
            }
        };

        carregarProdutos();
    }, [isAuthenticated]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navegacao />

            <main className="main-wrapper" style={{ flex: 1 }}>
                <BoasVindas />

                <section className="home-dashboard">
                    <article className="dashboard-card dashboard-card-primary">
                        <div className="dashboard-icon">＋</div>
                        <div className="dashboard-content">
                            <span className="dashboard-badge">Cadastro</span>
                            <h3>Cadastrar produto</h3>
                            <p>Cadastre novos itens com código, preço, quantidade e condição do produto.</p>
                        </div>
                        <Link to={isAuthenticated ? '/cadastro/produto' : '/login'} className="dashboard-cta">
                            {isAuthenticated ? 'Cadastrar agora' : 'Entre para cadastrar'}
                        </Link>
                    </article>

                    <article className="dashboard-card dashboard-card-secondary">
                        <div className="dashboard-icon">✎</div>
                        <div className="dashboard-content">
                            <span className="dashboard-badge">Gestão</span>
                            <h3>Atualizar produto</h3>
                            <p>Atualize o estoque e mantenha a base de cadastro sempre correta.</p>
                        </div>
                        <Link to={isAuthenticated ? '/lista/produtos' : '/login'} className="dashboard-cta">
                            {isAuthenticated ? 'Atualizar agora' : 'Faça login'}
                        </Link>
                    </article>

                    <article className="dashboard-card dashboard-card-tall">
                        <div className="dashboard-icon">▣</div>
                        <div className="dashboard-content">
                            <span className="dashboard-badge">Listagem</span>
                            <h3>Lista de produtos</h3>
                            <p>Veja rapidamente todos os produtos cadastrados e o estado do inventário.</p>
                        </div>
                        <Link to={isAuthenticated ? '/lista/produtos' : '/login'} className="dashboard-cta">
                            {isAuthenticated ? 'Abrir listagem' : 'Acessar lista'}
                        </Link>
                    </article>
                </section>

                <section className="products-panel">
                    <div className="products-panel-header">
                        <div>
                            <span className="panel-kicker">Overview</span>
                            <h2>{isAuthenticated ? 'Produtos recentes' : 'Acesso rápido'}</h2>
                        </div>
                        {isAuthenticated && <Link to="/lista/produtos" className="panel-link">Ver todos</Link>}
                    </div>

                    {isAuthenticated ? (
                        carregando ? (
                            <div className="products-loading">Carregando produtos...</div>
                        ) : (
                            <div className="products-table-wrap">
                                <table className="products-table">
                                    <thead>
                                        <tr>
                                            <th>Código</th>
                                            <th>Produto</th>
                                            <th>Preço</th>
                                            <th>Estoque</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {produtos.length > 0 ? (
                                            produtos.slice(0, 5).map((produto) => (
                                                <tr key={produto.idProduto ?? produto.codigo}>
                                                    <td>{produto.codigo}</td>
                                                    <td>
                                                        <div className="product-name-box">
                                                            <strong>{produto.nome}</strong>
                                                            <span>{produto.descricao || 'Sem descrição'}</span>
                                                        </div>
                                                    </td>
                                                    <td>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(produto.preco_unitario)}</td>
                                                    <td>{produto.quantidade_disponivel}</td>
                                                    <td>
                                                        <span className={produto.ativo ? 'status-badge active' : 'status-badge inactive'}>
                                                            {produto.ativo ? 'Ativo' : 'Inativo'}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={5} className="empty-state">Nenhum produto cadastrado ainda.</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        )
                    ) : (
                        <div className="guest-panel">
                            <p>Faça login para visualizar os produtos cadastrados, cadastrar novos itens e atualizar o estoque.</p>
                            <Link to="/login" className="guest-button">Ir para login</Link>
                        </div>
                    )}
                </section>
            </main>

            <Rodape />
        </div>
    );
}

export default PHome;