import { useEffect, useState, type JSX } from "react";
import ProdutoRequests from "../../../fetch/ProdutoRequest";
import type { ProdutoDTO } from "../../../dto/ProdutoDTO";
import { useNavigate } from "react-router-dom";
import Utilitario from "../../../Utils/Utilitario";


interface DetalhesProdutoProps {
    idProduto: number;
}


function DetalhesProduto({
    idProduto

}: DetalhesProdutoProps): JSX.Element {

    const [produto, setProduto] = useState<ProdutoDTO | null>(null);

    const [loading, setLoading] = useState<boolean>(true);

    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();

    useEffect(() => {

        async function buscarDados() {

            setLoading(true);

            setError(null);

            try {

                const dados =
                    await ProdutoRequests.obterProdutoPorId(idProduto);

                if (dados) {

                    setProduto(dados);

                } else {

                    setError("Produto não encontrado.");

                }

            } catch (err) {

                console.error(
                    "Erro ao carregar detalhes do produto:",
                    err
                );

                setError(
                    "Ocorreu um erro ao buscar as informações do produto."
                );

            } finally {

                setLoading(false);

            }
        }

        buscarDados();

    }, [idProduto]);


    if (loading) {

        return (

            <main className="bg-gray-200 flex-1 py-6 sm:py-10 px-4 overflow-y-auto">

                <div className="w-full max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6 sm:p-8">

                    <div className="animate-pulse">

                        <div className="h-8 bg-gray-200 rounded w-2/3 mb-4"></div>

                        <div className="h-5 bg-gray-200 rounded w-1/3 mb-8"></div>


                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                            {[1, 2, 3, 4, 5, 6].map((item) => (

                                <div key={item}>

                                    <div className="h-3 bg-gray-200 rounded w-1/3 mb-2"></div>

                                    <div className="h-6 bg-gray-200 rounded w-2/3"></div>

                                </div>

                            ))}

                        </div>

                    </div>

                </div>

            </main>
        );
    }




    if (error || !produto) {

        return (

            <main className="bg-gray-200 flex-1 flex items-center justify-center p-4">

                <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-8 text-center">

                    <div className="text-red-500 text-5xl mb-4">

                        <i className="pi pi-exclamation-triangle"></i>

                    </div>

                    <h2 className="text-xl font-bold text-slate-800 mb-2">

                        Produto não encontrado

                    </h2>

                    <p className="text-slate-500 mb-6">

                        {error || "Não foi possível encontrar este produto."}

                    </p>

                    <button
                        type="button"
                        onClick={() => navigate("/lista/produtos")}
                        className="bg-slate-700 hover:bg-slate-600 text-white px-6 py-3 rounded-md font-bold transition-all"
                    >

                        Voltar para Produtos

                    </button>

                </div>

            </main>
        );
    }


    const quantidadeDisponivel =
        produto.quantidade_disponivel ?? 0;

    const estoqueBaixo =
        Utilitario.estoqueBaixo(
            Number(produto.quantidade_disponivel ?? 0),
            Number(produto.quantidade_minima ?? 0)
        );

    const precoUnitario = Number(produto.preco_unitario ?? 0);


    return (

        <main style={{
            flex: 1,
            padding: '32px 20px 40px',
            background: 'radial-gradient(circle at top, #eff6ff 0%, #e0f2fe 30%, #f8fafc 100%)',
            overflowY: 'auto'
        }}>

            <div style={{ width: '100%', maxWidth: 1200, margin: '0 auto' }}>

                <div style={{
                    borderRadius: 28,
                    overflow: 'hidden',
                    boxShadow: '0 24px 70px rgba(59, 130, 246, 0.18)',
                    border: '1px solid rgba(147, 197, 253, 0.7)',
                    background: '#fff'
                }}>

                    <div style={{
                        background: 'linear-gradient(90deg, #1d4ed8 0%, #2563eb 40%, #4338ca 100%)',
                        color: '#fff',
                        padding: '32px 28px'
                    }}>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>

                            <div>
                                <p style={{ margin: 0, fontSize: 12, fontWeight: 800, letterSpacing: '0.24em', textTransform: 'uppercase', opacity: 0.9 }}>Produto</p>
                                <h1 style={{ margin: '10px 0 0', display: 'flex', alignItems: 'center', gap: 14, fontSize: 'clamp(2rem, 3vw, 3rem)', fontWeight: 900 }}>
                                    <span style={{
                                        display: 'inline-flex',
                                        width: 52,
                                        height: 52,
                                        borderRadius: 16,
                                        background: 'rgba(255,255,255,0.12)',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.15)'
                                    }}>
                                        <i className="pi pi-box" style={{ fontSize: 22 }}></i>
                                    </span>
                                    {produto.nome}
                                </h1>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                                <span style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: 8,
                                    borderRadius: 999,
                                    border: '1px solid rgba(255,255,255,0.22)',
                                    background: 'rgba(255,255,255,0.12)',
                                    padding: '0.7rem 1rem',
                                    fontSize: 14,
                                    fontWeight: 700
                                }}>
                                    <i className="pi pi-calendar"></i>
                                    {produto.data_cadastro ? Utilitario.formatarData(produto.data_cadastro) : 'Sem data'}
                                </span>

                                <span style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: 8,
                                    borderRadius: 999,
                                    padding: '0.7rem 1rem',
                                    fontSize: 14,
                                    fontWeight: 800,
                                    background: produto.ativo ? '#22c55e' : '#ef4444',
                                    color: '#fff',
                                    boxShadow: produto.ativo ? '0 10px 20px rgba(34,197,94,0.35)' : '0 10px 20px rgba(239,68,68,0.3)'
                                }}>
                                    <i className={produto.ativo ? 'pi pi-check-circle' : 'pi pi-times-circle'}></i>
                                    {produto.ativo ? 'Ativo' : 'Inativo'}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div style={{ padding: '28px' }}>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: 18, marginBottom: 26 }}>
                            <div style={{ borderRadius: 20, border: '1px solid #dbeafe', background: '#eff6ff', padding: '18px 16px' }}>
                                <p style={{ margin: 0, fontSize: 11, fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#1d4ed8' }}>Código</p>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginTop: 12 }}>
                                    <span style={{ fontSize: 18, fontWeight: 800, color: '#0f172a' }}>{produto.codigo}</span>
                                    <button type="button" onClick={() => { navigator.clipboard.writeText(produto.codigo); alert('Código copiado!'); }} style={{ border: 'none', borderRadius: 12, background: '#dbeafe', color: '#1d4ed8', padding: '10px', cursor: 'pointer' }} title="Copiar código">
                                        <i className="pi pi-copy"></i>
                                    </button>
                                </div>
                            </div>

                            <div style={{ borderRadius: 20, border: '1px solid #e2e8f0', background: '#f8fafc', padding: '18px 16px' }}>
                                <p style={{ margin: 0, fontSize: 11, fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#64748b' }}>ID</p>
                                <div style={{ marginTop: 12, fontSize: 22, fontWeight: 800, color: '#0f172a' }}>#{produto.idProduto}</div>
                            </div>

                            <div style={{ borderRadius: 20, border: '1px solid #bbf7d0', background: '#ecfdf5', padding: '18px 16px' }}>
                                <p style={{ margin: 0, fontSize: 11, fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#15803d' }}>Preço</p>
                                <div style={{ marginTop: 12, fontSize: 22, fontWeight: 800, color: '#166534' }}>{Utilitario.formatarParaReal(Number(produto.preco_unitario ?? 0))}</div>
                            </div>

                            <div style={{ borderRadius: 20, border: '1px solid #fef3c7', background: '#fffbeb', padding: '18px 16px' }}>
                                <p style={{ margin: 0, fontSize: 11, fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#b45309' }}>Estoque</p>
                                <div style={{ marginTop: 12, fontSize: 22, fontWeight: 800, color: '#0f172a' }}>{quantidadeDisponivel}</div>
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 0.8fr', gap: 22 }}>
                            <section style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 24, padding: 24 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
                                    <div style={{ width: 42, height: 42, borderRadius: 14, background: '#dbeafe', color: '#1d4ed8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <i className="pi pi-info-circle"></i>
                                    </div>
                                    <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: '#0f172a' }}>Informações do produto</h2>
                                </div>

                                <div style={{ display: 'grid', gap: 16 }}>
                                    <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 18, padding: 18 }}>
                                        <span style={{ display: 'block', fontSize: 11, fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#64748b', marginBottom: 10 }}>Descrição</span>
                                        <p style={{ margin: 0, color: '#334155', lineHeight: 1.7 }}>{produto.descricao || 'Nenhuma descrição informada.'}</p>
                                    </div>

                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 16 }}>
                                        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 18, padding: 18 }}>
                                            <span style={{ display: 'block', fontSize: 11, fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#64748b', marginBottom: 10 }}>Categoria</span>
                                            <span style={{ display: 'inline-flex', alignItems: 'center', borderRadius: 999, background: '#dbeafe', color: '#1d4ed8', padding: '0.4rem 0.8rem', fontWeight: 700 }}>ID: {produto.idCategoria}</span>
                                        </div>

                                        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 18, padding: 18 }}>
                                            <span style={{ display: 'block', fontSize: 11, fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#64748b', marginBottom: 10 }}>Quantidade mínima</span>
                                            <span style={{ fontSize: 15, fontWeight: 700, color: '#0f172a' }}>{produto.quantidade_minima} {produto.quantidade_minima === 1 ? 'unidade' : 'unidades'}</span>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <aside style={{ background: 'linear-gradient(135deg, #fff7ed 0%, #ffffff 50%, #fffbeb 100%)', border: '1px solid #fed7aa', borderRadius: 24, padding: 24 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
                                    <div style={{ width: 42, height: 42, borderRadius: 14, background: '#f59e0b', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 12px 30px rgba(245, 158, 11, 0.25)' }}>
                                        <i className="pi pi-chart-bar"></i>
                                    </div>
                                    <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: '#0f172a' }}>Estoque e valor</h2>
                                </div>

                                <div style={{ display: 'grid', gap: 16 }}>
                                    <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 18, padding: 18 }}>
                                        <p style={{ margin: 0, fontSize: 11, fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#64748b', marginBottom: 10 }}>Status do estoque</p>
                                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, borderRadius: 999, padding: '0.45rem 0.8rem', fontWeight: 700, background: estoqueBaixo ? '#fee2e2' : '#dcfce7', color: estoqueBaixo ? '#991b1b' : '#166534' }}>
                                            <i className={estoqueBaixo ? 'pi pi-exclamation-circle' : 'pi pi-check-circle'}></i>
                                            {estoqueBaixo ? 'Estoque baixo' : 'Estoque normal'}
                                        </span>
                                    </div>

                                    <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 18, padding: 18 }}>
                                        <p style={{ margin: 0, fontSize: 11, fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#64748b', marginBottom: 10 }}>Preço unitário</p>
                                        <p style={{ margin: 0, fontSize: 20, fontWeight: 800, color: '#0f172a' }}>{Utilitario.formatarParaReal(Number(produto.preco_unitario ?? 0))}</p>
                                    </div>
                                </div>
                            </aside>
                        </div>
                    </div>
                </div>

                <div style={{ width: '100%', marginTop: 22, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                    <button type="button" onClick={() => navigate(`/atualizar/produto/${produto.idProduto}`)} style={{ flex: 1, minWidth: 200, border: 'none', borderRadius: 18, background: 'linear-gradient(90deg, #2563eb 0%, #1d4ed8 100%)', color: '#fff', padding: '0.95rem 1.2rem', fontWeight: 800, cursor: 'pointer', boxShadow: '0 16px 30px rgba(37,99,235,0.25)' }}>
                        <i className="pi pi-pencil" style={{ marginRight: 8 }}></i>
                        Editar Produto
                    </button>
                    <button type="button" onClick={() => navigate('/lista/produtos')} style={{ flex: 1, minWidth: 200, border: '1px solid #cbd5e1', borderRadius: 18, background: '#fff', color: '#334155', padding: '0.95rem 1.2rem', fontWeight: 800, cursor: 'pointer' }}>
                        <i className="pi pi-arrow-left" style={{ marginRight: 8 }}></i>
                        Voltar à Lista
                    </button>
                </div>
            </div>
        </main>
    );
}

export default DetalhesProduto;