import { useEffect, useState, type JSX } from "react";
import MovimentacaoRequests from "../../../fetch/MovimentacaoRequest";
import type MovimentacaoDTO from "../../../dto/MovimentacaoDTO";
import { useNavigate } from "react-router-dom";
import Utilitario from "../../../Utils/Utilitario";


interface DetalhesMovimentacaoProps {
    idMovimentacao: number;
}


function DetalhesMovimentacao({
    idMovimentacao

}: DetalhesMovimentacaoProps): JSX.Element {

    const [movimentacao, setMovimentacao] = useState<MovimentacaoDTO | null>(null);

    const [loading, setLoading] = useState<boolean>(true);

    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();

    useEffect(() => {

        async function buscarDados() {

            setLoading(true);

            setError(null);

            try {

                const dados =
                    await MovimentacaoRequests.obterMovimentacaoPorId(idMovimentacao);

                if (dados) {

                    setMovimentacao(dados);

                } else {

                    setError("Movimentação não encontrada.");

                }

            } catch (err) {

                console.error(
                    "Erro ao carregar detalhes da movimentação:",
                    err
                );

                setError(
                    "Ocorreu um erro ao buscar as informações da movimentação."
                );

            } finally {

                setLoading(false);

            }
        }

        buscarDados();

    }, [idMovimentacao]);


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




    if (error || !movimentacao) {

        return (

            <main className="bg-gray-200 flex-1 flex items-center justify-center p-4">

                <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-8 text-center">

                    <div className="text-red-500 text-5xl mb-4">

                        <i className="pi pi-exclamation-triangle"></i>

                    </div>

                    <h2 className="text-xl font-bold text-slate-800 mb-2">

                        Movimentação não encontrada

                    </h2>

                    <p className="text-slate-500 mb-6">

                        {error || "Não foi possível encontrar esta movimentação."}

                    </p>

                    <button
                        type="button"
                        onClick={() => navigate("/lista/movimentacoes")}
                        className="bg-slate-700 hover:bg-slate-600 text-white px-6 py-3 rounded-md font-bold transition-all"
                    >

                        Voltar para Movimentações

                    </button>

                </div>

            </main>
        );
    }


    return (
        <main style={{
            flex: 1,
            padding: '32px 20px 40px',
            background: 'radial-gradient(circle at top, #ecfdf5 0%, #dcfce7 28%, #f8fafc 100%)',
            overflowY: 'auto'
        }}>
            <div style={{ width: '100%', maxWidth: 1200, margin: '0 auto' }}>
                <div style={{
                    borderRadius: 28,
                    overflow: 'hidden',
                    boxShadow: '0 24px 70px rgba(16, 185, 129, 0.18)',
                    border: '1px solid rgba(110, 231, 183, 0.7)',
                    background: '#fff'
                }}>
                    <div style={{
                        background: 'linear-gradient(90deg, #047857 0%, #16a34a 40%, #0f766e 100%)',
                        color: '#fff',
                        padding: '32px 28px'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
                            <div>
                                <p style={{ margin: 0, fontSize: 12, fontWeight: 800, letterSpacing: '0.24em', textTransform: 'uppercase', opacity: 0.9 }}>Movimentação</p>
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
                                        <i className="pi pi-arrows-h" style={{ fontSize: 22 }}></i>
                                    </span>
                                    {movimentacao.motivo_movimentacao || `Movimentação #${movimentacao.id_movimentacao}`}
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
                                    {movimentacao.data_movimentacao ? Utilitario.formatarData(movimentacao.data_movimentacao) : 'Sem data'}
                                </span>

                                <span style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: 8,
                                    borderRadius: 999,
                                    padding: '0.7rem 1rem',
                                    fontSize: 14,
                                    fontWeight: 800,
                                    background: movimentacao.ativo ? '#22c55e' : '#ef4444',
                                    color: '#fff',
                                    boxShadow: movimentacao.ativo ? '0 10px 20px rgba(34,197,94,0.35)' : '0 10px 20px rgba(239,68,68,0.3)'
                                }}>
                                    <i className={movimentacao.ativo ? 'pi pi-check-circle' : 'pi pi-times-circle'}></i>
                                    {movimentacao.ativo ? 'Ativa' : 'Inativa'}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div style={{ padding: '28px' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: 18, marginBottom: 26 }}>
                            <div style={{ borderRadius: 20, border: '1px solid #d1fae5', background: '#ecfdf5', padding: '18px 16px' }}>
                                <p style={{ margin: 0, fontSize: 11, fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#047857' }}>ID</p>
                                <div style={{ marginTop: 12, fontSize: 22, fontWeight: 800, color: '#0f172a' }}>#{movimentacao.id_movimentacao}</div>
                            </div>

                            <div style={{ borderRadius: 20, border: '1px solid #e2e8f0', background: '#f8fafc', padding: '18px 16px' }}>
                                <p style={{ margin: 0, fontSize: 11, fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#64748b' }}>Produto</p>
                                <div style={{ marginTop: 12, fontSize: 20, fontWeight: 800, color: '#0f172a' }}>{movimentacao.id_produto}</div>
                            </div>

                            <div style={{ borderRadius: 20, border: '1px solid #cffafe', background: '#ecfeff', padding: '18px 16px' }}>
                                <p style={{ margin: 0, fontSize: 11, fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#0f766e' }}>Tipo</p>
                                <div style={{ marginTop: 12 }}>
                                    <span style={{ display: 'inline-flex', alignItems: 'center', borderRadius: 999, background: '#cffafe', color: '#0f766e', padding: '0.4rem 0.8rem', fontWeight: 700 }}>{movimentacao.tipo_movimentacao}</span>
                                </div>
                            </div>

                            <div style={{ borderRadius: 20, border: '1px solid #fed7aa', background: '#fff7ed', padding: '18px 16px' }}>
                                <p style={{ margin: 0, fontSize: 11, fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#c2410c' }}>Valor total</p>
                                <div style={{ marginTop: 12, fontSize: 22, fontWeight: 800, color: '#0f172a' }}>{Utilitario.formatarParaReal(movimentacao.valor_total ?? 0)}</div>
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 0.8fr', gap: 22 }}>
                            <section style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 24, padding: 24 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
                                    <div style={{ width: 42, height: 42, borderRadius: 14, background: '#d1fae5', color: '#047857', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <i className="pi pi-info-circle"></i>
                                    </div>
                                    <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: '#0f172a' }}>Informações da movimentação</h2>
                                </div>

                                <div style={{ display: 'grid', gap: 16 }}>
                                    <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 18, padding: 18 }}>
                                        <span style={{ display: 'block', fontSize: 11, fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#64748b', marginBottom: 10 }}>Motivo</span>
                                        <p style={{ margin: 0, color: '#334155', lineHeight: 1.7 }}>{movimentacao.motivo_movimentacao || 'Não informado'}</p>
                                    </div>

                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 16 }}>
                                        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 18, padding: 18 }}>
                                            <span style={{ display: 'block', fontSize: 11, fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#64748b', marginBottom: 10 }}>Origem</span>
                                            <span style={{ fontSize: 15, fontWeight: 700, color: '#0f172a' }}>{movimentacao.id_movimentacao_origem ?? 'Sem origem'}</span>
                                        </div>

                                        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 18, padding: 18 }}>
                                            <span style={{ display: 'block', fontSize: 11, fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#64748b', marginBottom: 10 }}>Quantidade</span>
                                            <span style={{ fontSize: 15, fontWeight: 700, color: '#0f172a' }}>{movimentacao.quantidade} unidade(s)</span>
                                        </div>
                                    </div>

                                    <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 18, padding: 18 }}>
                                        <span style={{ display: 'block', fontSize: 11, fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#64748b', marginBottom: 10 }}>Observação</span>
                                        <p style={{ margin: 0, color: '#334155', lineHeight: 1.7 }}>{movimentacao.observacao || 'Nenhuma observação informada.'}</p>
                                    </div>
                                </div>
                            </section>

                            <aside style={{ background: 'linear-gradient(135deg, #fff7ed 0%, #ffffff 50%, #fffbeb 100%)', border: '1px solid #fed7aa', borderRadius: 24, padding: 24 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
                                    <div style={{ width: 42, height: 42, borderRadius: 14, background: '#f59e0b', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 12px 30px rgba(245, 158, 11, 0.25)' }}>
                                        <i className="pi pi-chart-line"></i>
                                    </div>
                                    <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: '#0f172a' }}>Valores</h2>
                                </div>

                                <div style={{ display: 'grid', gap: 16 }}>
                                    <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 18, padding: 18 }}>
                                        <p style={{ margin: 0, fontSize: 11, fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#64748b', marginBottom: 10 }}>Valor total</p>
                                        <p style={{ margin: 0, fontSize: 20, fontWeight: 800, color: '#0f172a' }}>{Utilitario.formatarParaReal(movimentacao.valor_total ?? 0)}</p>
                                    </div>

                                    <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 18, padding: 18 }}>
                                        <p style={{ margin: 0, fontSize: 11, fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#64748b', marginBottom: 10 }}>Preço unitário</p>
                                        <p style={{ margin: 0, fontSize: 20, fontWeight: 800, color: '#0f172a' }}>{Utilitario.formatarParaReal(movimentacao.preco_unitario ?? 0)}</p>
                                    </div>
                                </div>
                            </aside>
                        </div>
                    </div>
                </div>

                <div style={{ width: '100%', marginTop: 22, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                    <button type="button" onClick={() => navigate(`/atualizar/movimentacao/${movimentacao.id_movimentacao}`)} style={{ flex: 1, minWidth: 200, border: 'none', borderRadius: 18, background: 'linear-gradient(90deg, #059669 0%, #0f766e 100%)', color: '#fff', padding: '0.95rem 1.2rem', fontWeight: 800, cursor: 'pointer', boxShadow: '0 16px 30px rgba(5,150,105,0.25)' }}>
                        <i className="pi pi-pencil" style={{ marginRight: 8 }}></i>
                        Editar Movimentação
                    </button>
                    <button type="button" onClick={() => navigate('/lista/movimentacoes')} style={{ flex: 1, minWidth: 200, border: '1px solid #cbd5e1', borderRadius: 18, background: '#fff', color: '#334155', padding: '0.95rem 1.2rem', fontWeight: 800, cursor: 'pointer' }}>
                        <i className="pi pi-arrow-left" style={{ marginRight: 8 }}></i>
                        Voltar à Lista
                    </button>
                </div>
            </div>
        </main>
    );
}

export default DetalhesMovimentacao;