import { useEffect, useState, type JSX } from "react";
import CategoriaRequests from "../../../fetch/CategoriaRequest";
import type CategoriaDTO from "../../../dto/CategoriaDTO";
import { useNavigate } from "react-router-dom";
import Utilitario from "../../../Utils/Utilitario";


interface DetalhesCategoriaProps {
    idCategoria: number;
}


function DetalhesCategoria({
    idCategoria

}: DetalhesCategoriaProps): JSX.Element {

    const [categoria, setCategoria] = useState<CategoriaDTO | null>(null);

    const [loading, setLoading] = useState<boolean>(true);

    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();

    useEffect(() => {

        async function buscarDados() {

            setLoading(true);

            setError(null);

            try {

                const dados =
                    await CategoriaRequests.obterCategoriaPorId(idCategoria);

                if (dados) {

                    setCategoria(dados);

                } else {

                    setError("Categoria não encontrada.");

                }

            } catch (err) {

                console.error(
                    "Erro ao carregar detalhes da categoria:",
                    err
                );

                setError(
                    "Ocorreu um erro ao buscar as informações da categoria."
                );

            } finally {

                setLoading(false);

            }
        }

        buscarDados();

    }, [idCategoria]);


    if (loading) {

        return (

            <main className="bg-gradient-to-b from-purple-50 to-gray-100 flex-1 py-6 sm:py-10 px-4 overflow-y-auto">

                <div className="w-full max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-6 sm:p-8">

                    <div className="animate-pulse">

                        <div className="h-10 bg-gradient-to-r from-purple-200 to-indigo-200 rounded-lg w-2/3 mb-6"></div>

                        <div className="h-5 bg-purple-100 rounded w-1/3 mb-8"></div>


                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                            {[1, 2, 3, 4, 5, 6].map((item) => (

                                <div key={item} className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl">

                                    <div className="h-3 bg-purple-200 rounded w-1/3 mb-4"></div>

                                    <div className="space-y-3">
                                        <div className="h-4 bg-purple-100 rounded w-2/3"></div>
                                        <div className="h-4 bg-purple-100 rounded w-1/2"></div>
                                    </div>

                                </div>

                            ))}

                        </div>

                    </div>

                </div>

            </main>
        );
    }




    if (error || !categoria) {

        return (

            <main className="bg-gray-200 flex-1 flex items-center justify-center p-4">

                <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-8 text-center">

                    <div className="text-red-500 text-5xl mb-4">

                        <i className="pi pi-exclamation-triangle"></i>

                    </div>

                    <h2 className="text-xl font-bold text-slate-800 mb-2">

                        Categoria não encontrada

                    </h2>

                    <p className="text-slate-500 mb-6">

                        {error || "Não foi possível encontrar esta categoria."}

                    </p>

                    <button
                        type="button"
                        onClick={() => navigate("/lista/categorias")}
                        className="bg-slate-700 hover:bg-slate-600 text-white px-6 py-3 rounded-md font-bold transition-all"
                    >

                        Voltar para Categorias

                    </button>

                </div>

            </main>
        );
    }


    return (
        <main style={{
            flex: 1,
            padding: '32px 20px 40px',
            background: 'radial-gradient(circle at top, #f5f3ff 0%, #eef2ff 28%, #f8fafc 100%)',
            overflowY: 'auto'
        }}>
            <div style={{ width: '100%', maxWidth: 1200, margin: '0 auto' }}>
                <div style={{
                    borderRadius: 28,
                    overflow: 'hidden',
                    boxShadow: '0 24px 70px rgba(88, 83, 255, 0.18)',
                    border: '1px solid rgba(167, 139, 250, 0.6)',
                    background: '#fff'
                }}>
                    <div style={{
                        background: 'linear-gradient(90deg, #6d28d9 0%, #7c3aed 40%, #4f46e5 100%)',
                        color: '#fff',
                        padding: '32px 28px'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
                            <div>
                                <p style={{ margin: 0, fontSize: 12, fontWeight: 800, letterSpacing: '0.24em', textTransform: 'uppercase', opacity: 0.9 }}>Categoria</p>
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
                                        <i className="pi pi-tags" style={{ fontSize: 22 }}></i>
                                    </span>
                                    {categoria.nome}
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
                                    {categoria.data_cadastro ? Utilitario.formatarData(categoria.data_cadastro) : 'Sem data'}
                                </span>

                                <span style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: 8,
                                    borderRadius: 999,
                                    padding: '0.7rem 1rem',
                                    fontSize: 14,
                                    fontWeight: 800,
                                    background: categoria.ativo ? '#22c55e' : '#ef4444',
                                    color: '#fff',
                                    boxShadow: categoria.ativo ? '0 10px 20px rgba(34,197,94,0.35)' : '0 10px 20px rgba(239,68,68,0.3)'
                                }}>
                                    <i className={categoria.ativo ? 'pi pi-check-circle' : 'pi pi-times-circle'}></i>
                                    {categoria.ativo ? 'Ativa' : 'Inativa'}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div style={{ padding: '28px' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 18, marginBottom: 26 }}>
                            <div style={{ borderRadius: 20, border: '1px solid #e9d5ff', background: '#faf5ff', padding: '18px 16px' }}>
                                <p style={{ margin: 0, fontSize: 11, fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#7c3aed' }}>ID</p>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginTop: 12 }}>
                                    <span style={{ fontSize: 22, fontWeight: 800, color: '#0f172a' }}>#{categoria.id_categoria}</span>
                                    <button type="button" onClick={() => { navigator.clipboard.writeText(String(categoria.id_categoria)); alert('ID copiado!'); }} style={{ border: 'none', borderRadius: 12, background: '#ede9fe', color: '#6d28d9', padding: '10px', cursor: 'pointer' }} title="Copiar ID">
                                        <i className="pi pi-copy"></i>
                                    </button>
                                </div>
                            </div>

                            <div style={{ borderRadius: 20, border: '1px solid #bbf7d0', background: '#ecfdf5', padding: '18px 16px' }}>
                                <p style={{ margin: 0, fontSize: 11, fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#15803d' }}>Status</p>
                                <div style={{ marginTop: 12 }}>
                                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, borderRadius: 999, background: categoria.ativo ? '#dcfce7' : '#fee2e2', color: categoria.ativo ? '#166534' : '#991b1b', padding: '0.4rem 0.75rem', fontWeight: 700 }}> 
                                        <i className={categoria.ativo ? 'pi pi-check-circle' : 'pi pi-times-circle'}></i>
                                        {categoria.ativo ? 'Disponível' : 'Indisponível'}
                                    </span>
                                </div>
                            </div>

                            <div style={{ borderRadius: 20, border: '1px solid #e2e8f0', background: '#f8fafc', padding: '18px 16px' }}>
                                <p style={{ margin: 0, fontSize: 11, fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#64748b' }}>Nome</p>
                                <div style={{ marginTop: 12, fontSize: 20, fontWeight: 800, color: '#0f172a' }}>{categoria.nome}</div>
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 0.8fr', gap: 22 }}>
                            <section style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 24, padding: 24 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
                                    <div style={{ width: 42, height: 42, borderRadius: 14, background: '#ede9fe', color: '#6d28d9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <i className="pi pi-info-circle"></i>
                                    </div>
                                    <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: '#0f172a' }}>Informações da categoria</h2>
                                </div>

                                <div style={{ display: 'grid', gap: 16 }}>
                                    <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 18, padding: 18 }}>
                                        <span style={{ display: 'block', fontSize: 11, fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#64748b', marginBottom: 10 }}>Descrição</span>
                                        <p style={{ margin: 0, color: '#334155', lineHeight: 1.7 }}>{categoria.descricao || 'Nenhuma descrição informada.'}</p>
                                    </div>

                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 16 }}>
                                        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 18, padding: 18 }}>
                                            <span style={{ display: 'block', fontSize: 11, fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#64748b', marginBottom: 10 }}>Cadastro</span>
                                            <span style={{ fontSize: 15, fontWeight: 700, color: '#0f172a' }}>{categoria.data_cadastro ? Utilitario.formatarData(categoria.data_cadastro) : 'Não informada'}</span>
                                        </div>

                                        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 18, padding: 18 }}>
                                            <span style={{ display: 'block', fontSize: 11, fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#64748b', marginBottom: 10 }}>Visibilidade</span>
                                            <span style={{ display: 'inline-flex', alignItems: 'center', borderRadius: 999, background: categoria.ativo ? '#dcfce7' : '#fee2e2', color: categoria.ativo ? '#166534' : '#991b1b', padding: '0.35rem 0.75rem', fontWeight: 700 }}>
                                                {categoria.ativo ? 'Categoria ativa' : 'Categoria inativa'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <aside style={{ background: 'linear-gradient(135deg, #f5f3ff 0%, #ffffff 50%, #eef2ff 100%)', border: '1px solid #ddd6fe', borderRadius: 24, padding: 24 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
                                    <div style={{ width: 42, height: 42, borderRadius: 14, background: '#7c3aed', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 12px 30px rgba(124,58,237,0.25)' }}>
                                        <i className="pi pi-star"></i>
                                    </div>
                                    <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: '#0f172a' }}>Resumo</h2>
                                </div>

                                <div style={{ display: 'grid', gap: 16 }}>
                                    <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 18, padding: 18 }}>
                                        <p style={{ margin: 0, fontSize: 11, fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#64748b', marginBottom: 10 }}>Categoria</p>
                                        <p style={{ margin: 0, fontSize: 20, fontWeight: 800, color: '#0f172a' }}>{categoria.nome}</p>
                                    </div>

                                    <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 18, padding: 18 }}>
                                        <p style={{ margin: 0, fontSize: 11, fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#64748b', marginBottom: 10 }}>Situação</p>
                                        <p style={{ margin: 0, fontWeight: 700, color: categoria.ativo ? '#16a34a' : '#dc2626' }}>{categoria.ativo ? 'Em uso e disponível para cadastro' : 'Sem uso no momento'}</p>
                                    </div>
                                </div>
                            </aside>
                        </div>
                    </div>
                </div>

                <div style={{ width: '100%', marginTop: 22, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                    <button type="button" onClick={() => navigate(`/atualizar/categoria/${categoria.id_categoria}`)} style={{ flex: 1, minWidth: 200, border: 'none', borderRadius: 18, background: 'linear-gradient(90deg, #7c3aed 0%, #4f46e5 100%)', color: '#fff', padding: '0.95rem 1.2rem', fontWeight: 800, cursor: 'pointer', boxShadow: '0 16px 30px rgba(124,58,237,0.25)' }}>
                        <i className="pi pi-pencil" style={{ marginRight: 8 }}></i>
                        Editar Categoria
                    </button>
                    <button type="button" onClick={() => navigate('/lista/categorias')} style={{ flex: 1, minWidth: 200, border: '1px solid #cbd5e1', borderRadius: 18, background: '#fff', color: '#334155', padding: '0.95rem 1.2rem', fontWeight: 800, cursor: 'pointer' }}>
                        <i className="pi pi-arrow-left" style={{ marginRight: 8 }}></i>
                        Voltar à Lista
                    </button>
                </div>
            </div>
        </main>
    );
}

export default DetalhesCategoria;