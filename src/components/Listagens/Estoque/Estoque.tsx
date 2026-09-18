import { type JSX, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProdutoRequests from "../../../fetch/ProdutoRequest";
import type { ProdutoDTO } from "../../../dto/ProdutoDTO";
import Utilitario from "../../../Utils/Utilitario";

function Estoque(): JSX.Element {
    const [produtos, setProdutos] = useState<ProdutoDTO[]>([]);
    const [busca, setBusca] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const carregarProdutos = async () => {
            try {
                const lista = await ProdutoRequests.listar();
                setProdutos(Array.isArray(lista) ? lista : []);
            } catch (error) {
                console.error("Erro ao buscar estoque:", error);
                setProdutos([]);
            }
        };

        carregarProdutos();
    }, []);

    const produtosFiltrados = useMemo(() => {
        const termo = busca.trim().toLowerCase();

        if (!termo) {
            return produtos;
        }

        return produtos.filter((produto) =>
            produto.codigo.toLowerCase().includes(termo) ||
            produto.nome.toLowerCase().includes(termo) ||
            (produto.descricao ?? "").toLowerCase().includes(termo)
        );
    }, [produtos, busca]);

    const totalProdutos = produtos.length;
    const totalEstoque = produtos.reduce((soma, produto) => soma + (produto.quantidade_disponivel ?? 0), 0);
    const produtosBaixo = produtos.filter((produto) =>
        Utilitario.estoqueBaixo(produto.quantidade_disponivel, produto.quantidade_minima ?? 0)
    ).length;
    const valorTotalEstoque = produtos.reduce((soma, produto) => {
        const quantidade = produto.quantidade_disponivel ?? 0;
        return soma + (quantidade * (produto.preco_unitario ?? 0));
    }, 0);

    return (
        <main style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            padding: "32px 20px 40px",
            background: "linear-gradient(180deg, #f8fafc 0%, #eef4ff 100%)"
        }}>
            <div style={{
                width: "100%",
                maxWidth: 1200,
                margin: "0 auto 20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 16,
                flexWrap: "wrap"
            }}>
                <div>
                    <p style={{ margin: 0, color: "#2563eb", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", fontSize: "0.75rem" }}>
                        Estoque
                    </p>
                    <h1 style={{ margin: "8px 0 0", fontSize: "clamp(2rem, 2vw, 2.8rem)", color: "#0f172a" }}>
                        Controle de estoque
                    </h1>
                </div>

                <button
                    type="button"
                    onClick={() => navigate("/cadastro/produto")}
                    style={{
                        background: "#0f172a",
                        color: "#fff",
                        border: "none",
                        borderRadius: 10,
                        padding: "0.8rem 1.2rem",
                        fontWeight: 700,
                        cursor: "pointer"
                    }}
                >
                    Novo produto
                </button>
            </div>

            <section style={{
                width: "100%",
                maxWidth: 1200,
                margin: "0 auto 24px",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: 18
            }}>
                <div style={{ background: "#fff", borderRadius: 18, padding: 20, boxShadow: "0 20px 30px rgba(15, 23, 42, 0.06)", border: "1px solid rgba(148,163,184,0.2)" }}>
                    <p style={{ margin: 0, color: "#64748b", fontSize: 13, textTransform: "uppercase", letterSpacing: "0.08em" }}>Produtos</p>
                    <h3 style={{ margin: "10px 0 0", fontSize: "2rem", color: "#0f172a" }}>{totalProdutos}</h3>
                </div>

                <div style={{ background: "#fff", borderRadius: 18, padding: 20, boxShadow: "0 20px 30px rgba(15, 23, 42, 0.06)", border: "1px solid rgba(148,163,184,0.2)" }}>
                    <p style={{ margin: 0, color: "#64748b", fontSize: 13, textTransform: "uppercase", letterSpacing: "0.08em" }}>Em estoque</p>
                    <h3 style={{ margin: "10px 0 0", fontSize: "2rem", color: "#0f172a" }}>{totalEstoque}</h3>
                </div>

                <div style={{ background: "#fff", borderRadius: 18, padding: 20, boxShadow: "0 20px 30px rgba(15, 23, 42, 0.06)", border: "1px solid rgba(148,163,184,0.2)" }}>
                    <p style={{ margin: 0, color: "#64748b", fontSize: 13, textTransform: "uppercase", letterSpacing: "0.08em" }}>Baixo nível</p>
                    <h3 style={{ margin: "10px 0 0", fontSize: "2rem", color: produtosBaixo > 0 ? "#dc2626" : "#16a34a" }}>{produtosBaixo}</h3>
                </div>

                <div style={{ background: "#fff", borderRadius: 18, padding: 20, boxShadow: "0 20px 30px rgba(15, 23, 42, 0.06)", border: "1px solid rgba(148,163,184,0.2)" }}>
                    <p style={{ margin: 0, color: "#64748b", fontSize: 13, textTransform: "uppercase", letterSpacing: "0.08em" }}>Valor em estoque</p>
                    <h3 style={{ margin: "10px 0 0", fontSize: "1.7rem", color: "#0f172a" }}>{Utilitario.formatarParaReal(valorTotalEstoque)}</h3>
                </div>
            </section>

            <div style={{
                width: "100%",
                maxWidth: 1200,
                margin: "0 auto",
                background: "#fff",
                borderRadius: 18,
                border: "1px solid rgba(148,163,184,0.2)",
                boxShadow: "0 20px 40px rgba(15, 23, 42, 0.06)",
                overflow: "hidden"
            }}>
                <div style={{ padding: "18px 20px 0" }}>
                    <input
                        type="text"
                        value={busca}
                        onChange={(e) => setBusca(e.target.value)}
                        placeholder="Buscar por código, nome ou descrição"
                        style={{
                            width: "100%",
                            padding: "0.9rem 1rem",
                            borderRadius: 12,
                            border: "1px solid rgba(148,163,184,0.5)",
                            background: "#fff",
                            fontSize: "1rem",
                            outline: "none",
                            boxSizing: "border-box"
                        }}
                    />
                </div>

                <div style={{ overflowX: "auto" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 900 }}>
                        <thead style={{ background: "#0f172a" }}>
                            <tr>
                                <th style={{ padding: "14px 16px", color: "#fff", textAlign: "left", fontSize: "0.82rem" }}>Código</th>
                                <th style={{ padding: "14px 16px", color: "#fff", textAlign: "left", fontSize: "0.82rem" }}>Produto</th>
                                <th style={{ padding: "14px 16px", color: "#fff", textAlign: "center", fontSize: "0.82rem" }}>Estoque</th>
                                <th style={{ padding: "14px 16px", color: "#fff", textAlign: "center", fontSize: "0.82rem" }}>Mínimo</th>
                                <th style={{ padding: "14px 16px", color: "#fff", textAlign: "center", fontSize: "0.82rem" }}>Status</th>
                                <th style={{ padding: "14px 16px", color: "#fff", textAlign: "center", fontSize: "0.82rem" }}>Preço</th>
                                <th style={{ padding: "14px 16px", color: "#fff", textAlign: "center", fontSize: "0.82rem" }}>Ações</th>
                            </tr>
                        </thead>

                        <tbody>
                            {produtosFiltrados.length > 0 ? (
                                produtosFiltrados.map((produto) => {
                                    const baixo = Utilitario.estoqueBaixo(produto.quantidade_disponivel, produto.quantidade_minima ?? 0);

                                    return (
                                        <tr key={produto.idProduto} style={{ borderBottom: "1px solid #e2e8f0" }}>
                                            <td style={{ padding: "14px 16px", color: "#0f172a", fontWeight: 600 }}>{produto.codigo}</td>
                                            <td style={{ padding: "14px 16px", color: "#0f172a" }}>
                                                <div style={{ display: "flex", flexDirection: "column" }}>
                                                    <strong>{produto.nome}</strong>
                                                    <span style={{ color: "#64748b", fontSize: "0.82rem" }}>{produto.descricao || "Sem descrição"}</span>
                                                </div>
                                            </td>
                                            <td style={{ padding: "14px 16px", textAlign: "center", color: baixo ? "#dc2626" : "#166534", fontWeight: 700 }}>
                                                {produto.quantidade_disponivel ?? 0}
                                            </td>
                                            <td style={{ padding: "14px 16px", textAlign: "center", color: "#475569" }}>{produto.quantidade_minima ?? 0}</td>
                                            <td style={{ padding: "14px 16px", textAlign: "center" }}>
                                                <span style={{
                                                    display: "inline-flex",
                                                    padding: "6px 10px",
                                                    borderRadius: 999,
                                                    fontWeight: 700,
                                                    fontSize: "0.72rem",
                                                    background: baixo ? "#fee2e2" : "#dcfce7",
                                                    color: baixo ? "#991b1b" : "#166534"
                                                }}>
                                                    {baixo ? "Estoque baixo" : "Normal"}
                                                </span>
                                            </td>
                                            <td style={{ padding: "14px 16px", textAlign: "center", color: "#475569" }}>
                                                {Utilitario.formatarParaReal(produto.preco_unitario ?? 0)}
                                            </td>
                                            <td style={{ padding: "14px 16px", textAlign: "center" }}>
                                                <button
                                                    type="button"
                                                    onClick={() => navigate(`/detalhes/produto/${produto.idProduto}`)}
                                                    style={{
                                                        background: "#dbeafe",
                                                        color: "#1d4ed8",
                                                        border: "none",
                                                        borderRadius: 8,
                                                        padding: "0.5rem 0.8rem",
                                                        fontWeight: 700,
                                                        cursor: "pointer"
                                                    }}
                                                >
                                                    Detalhes
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan={7} style={{ padding: "28px 16px", textAlign: "center", color: "#64748b", fontStyle: "italic" }}>
                                        Nenhum produto encontrado no estoque.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    );
}

export default Estoque;
