import { type JSX, useEffect, useState } from "react";

import MovimentacaoRequests from "../../../fetch/MovimentacaoRequest";

import type MovimentacaoDTO from "../../../dto/MovimentacaoDTO";

import { useNavigate } from "react-router-dom";

import Utilitario from "../../../Utils/Utilitario";

function ListagemMovimentacoes(): JSX.Element {

    const [movimentacoes, setMovimentacoes] = useState<MovimentacaoDTO[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [busca, setBusca] = useState("");

    const rowsPerPage = 5;
    const navigate = useNavigate();

    useEffect(() => {

        const buscar = async () => {

            try {

                const lista = await MovimentacaoRequests.listar();

                setMovimentacoes(Array.isArray(lista) ? lista : []);

            } catch (error) {

                console.error(`Erro ao buscar movimentações: ${error}`);
                setMovimentacoes([]);
                alert("Erro ao criar a listagem de movimentações.");
            }
        };

        buscar();

    }, []);

    const movimentacoesFiltradas = (movimentacoes || []).filter((m) => {
        const textoBusca = busca.toLowerCase();

        return (
            String(m.id_produto ?? "").includes(textoBusca) ||
            (m.motivo_movimentacao ?? "").toLowerCase().includes(textoBusca) ||
            (m.tipo_movimentacao ?? "").toLowerCase().includes(textoBusca) ||
            (m.observacao ?? "").toLowerCase().includes(textoBusca)
        );
    });

    const totalPages = Math.ceil(movimentacoesFiltradas.length / rowsPerPage);

    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentMovimentacoes = movimentacoesFiltradas.slice(indexOfFirstRow, indexOfLastRow);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    return (
        <main style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            padding: '32px 20px 40px',
            background: 'linear-gradient(180deg, #f8fafc 0%, #eef4ff 100%)'
        }}>
            <div style={{
                width: '100%',
                maxWidth: 1200,
                margin: '0 auto 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 16,
                flexWrap: 'wrap'
            }}>
                <h1 style={{ margin: 0, fontSize: 'clamp(1.8rem, 2vw, 2.6rem)', color: '#0f172a' }}>Movimentações</h1>

                <button
                    type="button"
                    onClick={() => navigate("/cadastro/movimentacao")}
                    style={{
                        background: '#0f172a',
                        color: '#fff',
                        border: 'none',
                        borderRadius: 10,
                        padding: '0.8rem 1.2rem',
                        fontWeight: 700,
                        cursor: 'pointer'
                    }}
                >
                    Nova Movimentação
                </button>
            </div>

            <input
                type="text"
                value={busca}
                onChange={(e) => { setBusca(e.target.value); setCurrentPage(1); }}
                placeholder="Buscar por produto, tipo, motivo ou observação"
                style={{
                    width: '100%',
                    maxWidth: 1200,
                    margin: '0 auto 20px',
                    padding: '0.9rem 1rem',
                    borderRadius: 12,
                    border: '1px solid rgba(148,163,184,0.5)',
                    background: '#fff',
                    fontSize: '1rem',
                    outline: 'none',
                    display: 'block'
                }}
            />

            <div style={{
                width: '100%',
                maxWidth: 1200,
                margin: '0 auto',
                background: '#fff',
                borderRadius: 18,
                border: '1px solid rgba(148,163,184,0.2)',
                boxShadow: '0 20px 40px rgba(15, 23, 42, 0.06)',
                overflow: 'hidden'
            }}>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 900 }}>
                        <thead style={{ background: '#0f172a' }}>
                            <tr>
                                <th style={{ padding: '14px 16px', color: '#fff', textAlign: 'left', fontSize: '0.82rem' }}>ID</th>
                                <th style={{ padding: '14px 16px', color: '#fff', textAlign: 'left', fontSize: '0.82rem' }}>Produto</th>
                                <th style={{ padding: '14px 16px', color: '#fff', textAlign: 'left', fontSize: '0.82rem' }}>Tipo</th>
                                <th style={{ padding: '14px 16px', color: '#fff', textAlign: 'left', fontSize: '0.82rem' }}>Motivo</th>
                                <th style={{ padding: '14px 16px', color: '#fff', textAlign: 'center', fontSize: '0.82rem' }}>Qtde.</th>
                                <th style={{ padding: '14px 16px', color: '#fff', textAlign: 'center', fontSize: '0.82rem' }}>Valor</th>
                                <th style={{ padding: '14px 16px', color: '#fff', textAlign: 'center', fontSize: '0.82rem' }}>Data</th>
                                <th style={{ padding: '14px 16px', color: '#fff', textAlign: 'center', fontSize: '0.82rem' }}>Status</th>
                                <th style={{ padding: '14px 16px', color: '#fff', textAlign: 'center', fontSize: '0.82rem' }}>Ações</th>
                            </tr>
                        </thead>

                        <tbody>
                            {currentMovimentacoes.length > 0 ? (
                                currentMovimentacoes.map((m) => (
                                    <tr key={m.id_movimentacao} style={{ borderBottom: '1px solid #e2e8f0' }}>
                                        <td style={{ padding: '14px 16px', color: '#475569' }}>{m.id_movimentacao}</td>
                                        <td style={{ padding: '14px 16px', fontWeight: 600, color: '#0f172a' }}>{m.id_produto}</td>
                                        <td style={{ padding: '14px 16px', color: '#0f172a', fontWeight: 600 }}>{m.tipo_movimentacao}</td>
                                        <td style={{ padding: '14px 16px', color: '#0f172a' }}>{m.motivo_movimentacao}</td>
                                        <td style={{ padding: '14px 16px', textAlign: 'center', color: '#475569' }}>{m.quantidade ?? 0}</td>
                                        <td style={{ padding: '14px 16px', textAlign: 'center', color: '#475569' }}>{Utilitario.formatarParaReal(m.valor_total ?? 0)}</td>
                                        <td style={{ padding: '14px 16px', textAlign: 'center', color: '#475569' }}>{m.data_movimentacao ? new Date(m.data_movimentacao).toLocaleDateString() : '-'}</td>
                                        <td style={{ padding: '14px 16px', textAlign: 'center' }}>
                                            <span style={{
                                                display: 'inline-flex',
                                                padding: '6px 10px',
                                                borderRadius: 999,
                                                fontWeight: 700,
                                                fontSize: '0.72rem',
                                                background: m.ativo ? '#dcfce7' : '#fee2e2',
                                                color: m.ativo ? '#166534' : '#991b1b'
                                            }}>
                                                {Utilitario.formatarStatus(m.ativo)}
                                            </span>
                                        </td>
                                        <td style={{ padding: '14px 16px', textAlign: 'center' }}>
                                            <div style={{ display: 'flex', justifyContent: 'center', gap: 8, flexWrap: 'wrap' }}>
                                                <button
                                                    type="button"
                                                    onClick={() => navigate(`/detalhes/movimentacao/${m.id_movimentacao}`)}
                                                    style={{ background: '#dbeafe', color: '#1d4ed8', border: 'none', borderRadius: 8, padding: '0.5rem 0.7rem', fontWeight: 700, cursor: 'pointer' }}
                                                >
                                                    Detalhes
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => navigate(`/editar/movimentacao/${m.id_movimentacao}`)}
                                                    style={{ background: '#dcfce7', color: '#166534', border: 'none', borderRadius: 8, padding: '0.5rem 0.7rem', fontWeight: 700, cursor: 'pointer' }}
                                                >
                                                    Atualizar
                                                </button>
                                                <button
                                                    type="button"
                                                    style={{ background: '#fee2e2', color: '#991b1b', border: 'none', borderRadius: 8, padding: '0.5rem 0.7rem', fontWeight: 700, cursor: 'pointer' }}
                                                >
                                                    Deletar
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={9} style={{ padding: '28px 16px', textAlign: 'center', color: '#64748b', fontStyle: 'italic' }}>
                                        Nenhuma movimentação encontrada
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', background: '#f8fafc', borderTop: '1px solid #e2e8f0', flexWrap: 'wrap', gap: 12 }}>
                    <p style={{ margin: 0, color: '#475569', fontSize: '0.92rem' }}>
                        Mostrando <strong>{movimentacoesFiltradas.length > 0 ? indexOfFirstRow + 1 : 0}</strong> até <strong>{Math.min(indexOfLastRow, movimentacoesFiltradas.length)}</strong> de <strong>{movimentacoesFiltradas.length}</strong>
                    </p>

                    <nav style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
                        <button type="button" disabled={currentPage === 1} onClick={() => paginate(Math.max(1, currentPage - 1))} style={{ background: '#fff', border: '1px solid #cbd5e1', borderRadius: 8, padding: '0.5rem 0.7rem', cursor: currentPage === 1 ? 'not-allowed' : 'pointer', opacity: currentPage === 1 ? 0.5 : 1 }}>Anterior</button>
                        {[...Array(totalPages)].map((_, i) => (
                            <button
                                key={i + 1}
                                type="button"
                                onClick={() => paginate(i + 1)}
                                style={{
                                    background: currentPage === i + 1 ? '#0f172a' : '#fff',
                                    color: currentPage === i + 1 ? '#fff' : '#0f172a',
                                    border: '1px solid #cbd5e1',
                                    borderRadius: 8,
                                    padding: '0.5rem 0.7rem',
                                    cursor: 'pointer',
                                    minWidth: 36
                                }}
                            >
                                {i + 1}
                            </button>
                        ))}
                        <button type="button" disabled={currentPage === totalPages || totalPages === 0} onClick={() => paginate(Math.min(totalPages, currentPage + 1))} style={{ background: '#fff', border: '1px solid #cbd5e1', borderRadius: 8, padding: '0.5rem 0.7rem', cursor: currentPage === totalPages || totalPages === 0 ? 'not-allowed' : 'pointer', opacity: currentPage === totalPages || totalPages === 0 ? 0.5 : 1 }}>Próximo</button>
                    </nav>
                </div>
            </div>
        </main>
    );
}

export default ListagemMovimentacoes;