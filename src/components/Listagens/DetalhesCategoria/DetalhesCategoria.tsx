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

            <main className="bg-gray-200 flex-1 py-6 sm:py-10 px-4 overflow-y-auto">

                <div className="w-full max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6 sm:p-8">

                    <div className="animate-pulse">

                        <div className="h-8 bg-gray-200 rounded w-2/3 mb-4"></div>

                        <div className="h-5 bg-gray-200 rounded w-1/3 mb-8"></div>


                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                            {[1, 2, 3, 4].map((item) => (

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

        <main className="bg-gray-200 flex-1 py-6 sm:py-10 px-4 overflow-y-auto">

            <div className="w-full max-w-4xl mx-auto">

                <div className="bg-white rounded-xl shadow-lg p-5 sm:p-8 animate-fade-in">


                    <div className="flex flex-col gap-3">

                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">

                            <div>

                                <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">

                                    {categoria.nome}

                                </h1>

                                <p className="text-slate-500 mt-1">

                                    Detalhes da categoria

                                </p>

                            </div>


                            {/* STATUS */}

                            <span
                                className={
                                    categoria.ativo
                                        ? "inline-flex px-4 py-2 rounded-full text-sm font-semibold bg-emerald-100 text-emerald-700"
                                        : "inline-flex px-4 py-2 rounded-full text-sm font-semibold bg-red-100 text-red-700"
                                }
                            >

                                {categoria.ativo
                                    ? "Categoria Ativa"
                                    : "Categoria Inativa"
                                }

                            </span>

                        </div>


                        <div className="border-b border-slate-200 my-4"></div>



                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">


                            <section>

                                <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2 mb-5">

                                    <i className="pi pi-tags text-blue-500"></i>

                                    Informações da Categoria

                                </h2>


                                <div className="flex flex-col gap-5 border-l-2 border-blue-100 pl-4">


                                    {/* ID */}

                                    <div>

                                        <span className="block text-xs uppercase text-gray-400 font-bold tracking-wider">

                                            ID da Categoria

                                        </span>

                                        <span className="text-slate-700 font-medium">

                                            {categoria.id_categoria}

                                        </span>

                                    </div>


                                    {/* NOME */}

                                    <div>

                                        <span className="block text-xs uppercase text-gray-400 font-bold tracking-wider">

                                            Nome

                                        </span>

                                        <span className="text-slate-700 font-medium">

                                            {categoria.nome}

                                        </span>

                                    </div>


                                    {/* DESCRIÇÃO */}

                                    <div>

                                        <span className="block text-xs uppercase text-gray-400 font-bold tracking-wider">

                                            Descrição

                                        </span>

                                        <span className="text-slate-700 font-medium leading-relaxed">

                                            {categoria.descricao ||
                                                "Nenhuma descrição informada."}

                                        </span>

                                    </div>


                                    {/* DATA */}

                                    <div>

                                        <span className="block text-xs uppercase text-gray-400 font-bold tracking-wider">

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


                            <section>

                                <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2 mb-5">

                                    <i className="pi pi-info-circle text-orange-500"></i>

                                    Status

                                </h2>


                                <div className="flex flex-col gap-5 border-l-2 border-orange-100 pl-4">


                                    {/* SITUAÇÃO */}

                                    <div>

                                        <span className="block text-xs uppercase text-gray-400 font-bold tracking-wider">

                                            Situação

                                        </span>

                                        <span
                                            className={
                                                categoria.ativo
                                                    ? "inline-flex mt-1 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700"
                                                    : "inline-flex mt-1 px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700"
                                            }
                                        >

                                            {categoria.ativo
                                                ? "Ativa"
                                                : "Inativa"
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

                <div className="w-full mt-6 flex flex-col gap-3">

                    <button
                        type="button"
                        onClick={() =>
                            navigate(
                                `/atualizar/categoria/${categoria.id_categoria}`
                            )
                        }
                        className="w-full bg-slate-700 hover:bg-slate-600 text-white px-4 py-3 rounded-md font-bold transition-all shadow-md active:scale-95"
                    >

                        <i className="pi pi-pencil mr-2"></i>

                        Editar Categoria

                    </button>


                    <button
                        type="button"
                        onClick={() =>
                            navigate("/lista/categorias")
                        }
                        className="w-full bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 px-4 py-3 rounded-md font-bold transition-all shadow-md active:scale-95"
                    >

                        <i className="pi pi-arrow-left mr-2"></i>

                        Voltar

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

export default DetalhesCategoria;