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

        <main className="bg-gradient-to-b from-blue-50 to-gray-100 flex-1 py-6 sm:py-10 px-4 overflow-y-auto">

            <div className="w-full max-w-5xl mx-auto">

                {/* HEADER COM GRADIENTE */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-t-2xl shadow-lg p-6 sm:p-8 text-white animate-fade-in">

                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">

                        <div>

                            <h1 className="text-3xl sm:text-4xl font-bold mb-2 flex items-center gap-3">

                                <i className="pi pi-box"></i>

                                {produto.nome}

                            </h1>

                            <p className="text-blue-100 text-sm">

                                Visualizando detalhes completos do produto

                            </p>

                        </div>

                        {/* STATUS BADGE */}

                        <span
                            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap ${
                                produto.ativo
                                    ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/50"
                                    : "bg-red-500 text-white shadow-lg shadow-red-500/50"
                            }`}
                        >

                            <i className={produto.ativo ? "pi pi-check-circle" : "pi pi-times-circle"}></i>

                            {produto.ativo
                                ? "Ativo"
                                : "Inativo"
                            }

                        </span>

                    </div>

                </div>

                <div className="bg-white rounded-b-2xl shadow-lg p-5 sm:p-8 animate-fade-in-delayed">

                    <div className="flex flex-col gap-4">



                        {/* CÓDIGO DO PRODUTO */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-gradient-to-r from-sky-50 to-blue-50 p-4 rounded-xl border border-sky-200">

                            <div>
                                <span className="text-xs font-semibold text-sky-600 uppercase tracking-widest block mb-1">

                                    Código Identificador

                                </span>

                                <span className="text-lg font-bold text-sky-900">

                                    {produto.codigo}

                                </span>
                            </div>

                            <button
                                onClick={() => {
                                    navigator.clipboard.writeText(produto.codigo);
                                    alert("Código copiado!");
                                }}
                                className="px-3 py-2 bg-sky-500 hover:bg-sky-600 text-white rounded-lg text-xs font-bold transition-all"
                                title="Copiar código"
                            >

                                <i className="pi pi-copy mr-1"></i> Copiar

                            </button>

                        </div>

                        <hr className="border-t border-gray-200 my-6" />



                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">


                            {/* SEÇÃO: INFORMAÇÕES DO PRODUTO */}

                            <section className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border-l-4 border-blue-500 shadow-sm hover:shadow-md transition-shadow">

                                <h2 className="text-lg font-bold text-blue-900 flex items-center gap-2 mb-5">

                                    <i className="pi pi-box text-blue-600 text-xl"></i>

                                    Informações do Produto

                                </h2>


                                <div className="flex flex-col gap-6">


                                    {/* ID */}

                                    <div>

                                        <span className="block text-xs uppercase text-blue-600 font-bold tracking-wider mb-1">

                                            ID do Produto

                                        </span>

                                        <div className="flex items-center gap-2">
                                            <span className="text-lg font-semibold text-slate-900">

                                                {produto.idProduto}

                                            </span>

                                            <button
                                                onClick={() => {
                                                    navigator.clipboard.writeText(String(produto.idProduto));
                                                    alert("ID copiado!");
                                                }}
                                                className="p-1 text-blue-600 hover:bg-blue-200 rounded transition-all"
                                                title="Copiar ID"
                                            >

                                                <i className="pi pi-copy text-sm"></i>

                                            </button>
                                        </div>
                                    </div>


                                    {/* NOME */}

                                    <div>

                                        <span className="block text-xs uppercase text-blue-600 font-bold tracking-wider mb-1">

                                            Nome

                                        </span>

                                        <span className="text-slate-800 font-medium text-base">

                                            {produto.nome}

                                        </span>

                                    </div>


                                    {/* DESCRIÇÃO */}

                                    <div>

                                        <span className="block text-xs uppercase text-blue-600 font-bold tracking-wider mb-1">

                                            Descrição

                                        </span>

                                        <p className="text-slate-700 font-medium leading-relaxed text-base bg-white p-3 rounded-lg border border-blue-200">

                                            {produto.descricao ||
                                                "Nenhuma descrição informada."}

                                        </p>

                                    </div>


                                    {/* CATEGORIA */}

                                    <div>

                                        <span className="block text-xs uppercase text-blue-600 font-bold tracking-wider mb-1">

                                            Categoria

                                        </span>

                                        <span className="inline-block bg-blue-200 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">

                                            ID: {produto.idCategoria}

                                        </span>

                                    </div>


                                    {/* DATA */}

                                    <div>

                                        <span className="block text-xs uppercase text-blue-600 font-bold tracking-wider mb-1">

                                            Data de Cadastro

                                        </span>

                                        <span className="text-slate-700 font-medium">

                                            {produto.data_cadastro
                                                ? Utilitario.formatarData(
                                                    produto.data_cadastro
                                                )
                                                : "Não informada"
                                            }

                                        </span>

                                    </div>

                                </div>

                            </section>


                            {/* SEÇÃO: ESTOQUE E VALORES */}

                            <section className="bg-gradient-to-br from-orange-50 to-amber-50 p-6 rounded-xl border-l-4 border-orange-500 shadow-sm hover:shadow-md transition-shadow">

                                <h2 className="text-lg font-bold text-orange-900 flex items-center gap-2 mb-5">

                                    <i className="pi pi-chart-bar text-orange-600 text-xl"></i>

                                    Estoque e Valores

                                </h2>


                                <div className="flex flex-col gap-6">


                                    {/* PREÇO */}

                                    <div className="bg-white p-4 rounded-lg border-2 border-emerald-200">

                                        <span className="block text-xs uppercase text-orange-600 font-bold tracking-wider mb-1">

                                            Preço Unitário

                                        </span>

                                        <span className="text-emerald-600 font-bold text-2xl">

                                            {Utilitario.formatarParaReal(
                                                Number(produto.preco_unitario ?? 0)
                                            )}

                                        </span>

                                        <span className="block text-xs text-emerald-500 mt-1">

                                            Valor unitário de venda

                                        </span>

                                    </div>


                                    {/* QUANTIDADE */}

                                    <div>

                                        <span className="block text-xs uppercase text-orange-600 font-bold tracking-wider mb-2">

                                            Quantidade Disponível

                                        </span>

                                        <div className="flex items-baseline gap-2">
                                            <span className="text-3xl font-bold text-slate-900">

                                                {quantidadeDisponivel}

                                            </span>

                                            <span className="text-slate-600 text-sm">

                                                {quantidadeDisponivel === 1
                                                    ? "unidade"
                                                    : "unidades"
                                                }

                                            </span>
                                        </div>
                                    </div>


                                    {/* MÍNIMO */}

                                    <div>

                                        <span className="block text-xs uppercase text-orange-600 font-bold tracking-wider mb-1">

                                            Quantidade Mínima

                                        </span>

                                        <span className="text-slate-700 font-medium">

                                            {produto.quantidade_minima}{" "}

                                            {produto.quantidade_minima === 1
                                                ? "unidade"
                                                : "unidades"
                                            }

                                        </span>

                                    </div>


                                    {/* SITUAÇÃO ESTOQUE */}

                                    <div>

                                        <span className="block text-xs uppercase text-orange-600 font-bold tracking-wider mb-2">

                                            Situação do Estoque

                                        </span>

                                        <span
                                            className={`inline-flex items-center gap-2 mt-1 px-4 py-2 rounded-full text-sm font-semibold ${
                                                estoqueBaixo
                                                    ? "bg-red-100 text-red-700 border border-red-300"
                                                    : "bg-emerald-100 text-emerald-700 border border-emerald-300"
                                            }`}
                                        >

                                            <i className={estoqueBaixo ? "pi pi-exclamation-circle" : "pi pi-check-circle"}></i>

                                            {estoqueBaixo
                                                ? "Estoque Baixo"
                                                : "Estoque Normal"
                                            }

                                        </span>

                                    </div>

                                </div>

                            </section>

                        </div>

                    </div>

                </div>


                {/* =================================================
                    BOTÕES
                ================================================= */}

                <div className="w-full mt-6 flex flex-col sm:flex-row gap-3">

                    <button
                        type="button"
                        onClick={() =>
                            navigate(
                                `/atualizar/produto/${produto.idProduto}`
                            )
                        }
                        className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 py-3 rounded-lg font-bold transition-all shadow-md hover:shadow-lg active:scale-95 flex items-center justify-center gap-2"
                    >

                        <i className="pi pi-pencil"></i>

                        Editar Produto

                    </button>


                    <button
                        type="button"
                        onClick={() =>
                            navigate("/lista/produtos")
                        }
                        className="flex-1 bg-white border-2 border-slate-300 text-slate-700 hover:border-slate-400 hover:bg-slate-50 px-4 py-3 rounded-lg font-bold transition-all shadow-md hover:shadow-lg active:scale-95 flex items-center justify-center gap-2"
                    >

                        <i className="pi pi-arrow-left"></i>

                        Voltar à Lista

                    </button>

                </div>

            </div>


            {/* =================================================
                ANIMAÇÃO
            ================================================= */}

            <style>{`

                .animate-fade-in {
                    animation: fadeIn 0.5s ease-out;
                }

                @keyframes fadeIn {

                    from {
                        opacity: 0;
                        transform: translateY(10px);
                    }

                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }

                }

            `}</style>

        </main>
    );
}

export default DetalhesProduto;