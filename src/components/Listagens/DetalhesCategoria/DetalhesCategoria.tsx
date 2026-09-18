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

        <main className="bg-gradient-to-b from-purple-50 to-gray-100 flex-1 py-6 sm:py-10 px-4 overflow-y-auto">

            <div className="w-full max-w-5xl mx-auto">

                {/* HEADER COM GRADIENTE */}
                <div className="bg-gradient-to-r from-purple-600 to-indigo-700 rounded-t-2xl shadow-lg p-6 sm:p-8 text-white animate-fade-in">

                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">

                        <div>

                            <h1 className="text-3xl sm:text-4xl font-bold mb-2 flex items-center gap-3">

                                <i className="pi pi-tags"></i>

                                {categoria.nome}

                            </h1>

                            <p className="text-purple-100 text-sm">

                                Visualizando detalhes completos da categoria

                            </p>

                        </div>

                        {/* STATUS BADGE */}

                        <span
                            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap ${
                                categoria.ativo
                                    ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/50"
                                    : "bg-red-500 text-white shadow-lg shadow-red-500/50"
                            }`}
                        >

                            <i className={categoria.ativo ? "pi pi-check-circle" : "pi pi-times-circle"}></i>

                            {categoria.ativo
                                ? "Ativo"
                                : "Inativo"
                            }

                        </span>

                    </div>

                </div>

                <div className="bg-white rounded-b-2xl shadow-lg p-5 sm:p-8 animate-fade-in-delayed">

                    <div className="flex flex-col gap-4">

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                            {/* SEÇÃO: INFORMAÇÕES DA CATEGORIA */}

                            <section className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border-l-4 border-purple-500 shadow-sm hover:shadow-md transition-shadow">

                                <h2 className="text-lg font-bold text-purple-900 flex items-center gap-2 mb-5">

                                    <i className="pi pi-tags text-purple-600 text-xl"></i>

                                    Detalhes da Categoria

                                </h2>

                                <div className="flex flex-col gap-6">

                                    {/* ID */}

                                    <div>

                                        <span className="block text-xs uppercase text-purple-600 font-bold tracking-wider mb-1">

                                            ID da Categoria

                                        </span>

                                        <div className="flex items-center gap-2">
                                            <span className="text-lg font-semibold text-slate-900">

                                                {categoria.id_categoria}

                                            </span>

                                            <button
                                                onClick={() => {
                                                    navigator.clipboard.writeText(String(categoria.id_categoria));
                                                    alert("ID copiado!");
                                                }}
                                                className="p-1 text-purple-600 hover:bg-purple-200 rounded transition-all"
                                                title="Copiar ID"
                                            >

                                                <i className="pi pi-copy text-sm"></i>

                                            </button>
                                        </div>
                                    </div>

                                    {/* NOME */}

                                    <div>

                                        <span className="block text-xs uppercase text-purple-600 font-bold tracking-wider mb-1">

                                            Nome

                                        </span>

                                        <span className="text-slate-800 font-medium text-base">

                                            {categoria.nome}

                                        </span>

                                    </div>

                                    {/* DESCRIÇÃO */}

                                    <div>

                                        <span className="block text-xs uppercase text-purple-600 font-bold tracking-wider mb-1">

                                            Descrição

                                        </span>

                                        <p className="text-slate-700 font-medium leading-relaxed text-base bg-white p-3 rounded-lg border border-purple-200">

                                            {categoria.descricao ||
                                                "Nenhuma descrição informada."}

                                        </p>

                                    </div>

                                    {/* DATA */}

                                    <div>

                                        <span className="block text-xs uppercase text-purple-600 font-bold tracking-wider mb-1">

                                            Data de Cadastro

                                        </span>

                                        <span className="text-slate-700 font-medium">

                                            {categoria.data_cadastro
                                                ? Utilitario.formatarData(
                                                    categoria.data_cadastro
                                                )
                                                : "Não informada"
                                            }

                                        </span>

                                    </div>

                                </div>

                            </section>

                            {/* SEÇÃO: STATUS DA CATEGORIA */}

                            <section className="bg-gradient-to-br from-teal-50 to-cyan-50 p-6 rounded-xl border-l-4 border-teal-500 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-center">

                                <h2 className="text-lg font-bold text-teal-900 flex items-center gap-2 mb-6">

                                    <i className="pi pi-info-circle text-teal-600 text-xl"></i>

                                    Situação Atual

                                </h2>

                                <div className="space-y-4">

                                    {/* SITUAÇÃO */}

                                    <div className="bg-white p-6 rounded-lg border-2 border-teal-200 text-center">

                                        <span className="block text-xs uppercase text-teal-600 font-bold tracking-wider mb-3">

                                            Status da Categoria

                                        </span>

                                        <span
                                            className={`inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-bold ${
                                                categoria.ativo
                                                    ? "bg-emerald-100 text-emerald-700 border border-emerald-300"
                                                    : "bg-red-100 text-red-700 border border-red-300"
                                            }`}
                                        >

                                            <i className={categoria.ativo ? "pi pi-check-circle" : "pi pi-times-circle"}></i>

                                            {categoria.ativo
                                                ? "Categoria Ativa"
                                                : "Categoria Inativa"
                                            }

                                        </span>

                                    </div>

                                </div>

                            </section>

                        </div>

                    </div>

                </div>

                {/* SEÇÃO DE AÇÕES */}

                <div className="w-full mt-6 flex flex-col sm:flex-row gap-3">

                    <button
                        type="button"
                        onClick={() =>
                            navigate(
                                `/atualizar/categoria/${categoria.id_categoria}`
                            )
                        }
                        className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-purple-700 hover:to-indigo-800 text-white px-4 py-3 rounded-lg font-bold transition-all shadow-md hover:shadow-lg active:scale-95 flex items-center justify-center gap-2"
                    >

                        <i className="pi pi-pencil"></i>

                        Editar Categoria

                    </button>

                    <button
                        type="button"
                        onClick={() =>
                            navigate("/lista/categorias")
                        }
                        className="flex-1 bg-white border-2 border-slate-300 text-slate-700 hover:border-slate-400 hover:bg-slate-50 px-4 py-3 rounded-lg font-bold transition-all shadow-md hover:shadow-lg active:scale-95 flex items-center justify-center gap-2"
                    >

                        <i className="pi pi-arrow-left"></i>

                        Voltar à Lista

                    </button>

                </div>

            </div>

            {/* ANIMAÇÕES */}

            <style>{`

                .animate-fade-in {
                    animation: fadeIn 0.5s ease-out;
                }

                .animate-fade-in-delayed {
                    animation: fadeIn 0.5s ease-out 0.1s both;
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

export default DetalhesCategoria;