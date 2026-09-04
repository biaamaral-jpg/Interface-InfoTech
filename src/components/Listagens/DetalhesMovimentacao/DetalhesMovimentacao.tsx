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

        <main className="bg-gray-200 flex-1 py-6 sm:py-10 px-4 overflow-y-auto">

            <div className="w-full max-w-4xl mx-auto">

                <div className="bg-white rounded-xl shadow-lg p-5 sm:p-8 animate-fade-in">


                    <div className="flex flex-col gap-3">

                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">

                            <div>

                                <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">

                                    {movimentacao.motivo_movimentacao || `Movimentação #${movimentacao.id_movimentacao}`}

                                </h1>

                                <p className="text-slate-500 mt-1">

                                    Detalhes da movimentação

                                </p>

                            </div>


                            <span
                                className={
                                    movimentacao.ativo
                                        ? "inline-flex px-4 py-2 rounded-full text-sm font-semibold bg-emerald-100 text-emerald-700"
                                        : "inline-flex px-4 py-2 rounded-full text-sm font-semibold bg-red-100 text-red-700"
                                }
                            >

                                {movimentacao.ativo
                                    ? "Movimentação ativa"
                                    : "Movimentação inativa"
                                }

                            </span>

                        </div>


                        <div className="border-b border-slate-200 my-4"></div>



                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">


                            <section>

                                <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2 mb-5">

                                    <i className="pi pi-arrows-h text-blue-500"></i>

                                    Informações da Movimentação

                                </h2>


                                <div className="flex flex-col gap-5 border-l-2 border-blue-100 pl-4">


                                    {/* ID */}

                                    <div>

                                        <span className="block text-xs uppercase text-gray-400 font-bold tracking-wider">

                                            ID da Movimentação

                                        </span>

                                        <span className="text-slate-700 font-medium">

                                            {movimentacao.id_movimentacao}

                                        </span>

                                    </div>


                                    {/* PRODUTO */}

                                    <div>

                                        <span className="block text-xs uppercase text-gray-400 font-bold tracking-wider">

                                            Produto

                                        </span>

                                        <span className="text-slate-700 font-medium">

                                            {movimentacao.id_produto}

                                        </span>

                                    </div>


                                    {/* TIPO */}

                                    <div>

                                        <span className="block text-xs uppercase text-gray-400 font-bold tracking-wider">

                                            Tipo

                                        </span>

                                        <span className="text-slate-700 font-medium">

                                            {movimentacao.tipo_movimentacao}

                                        </span>

                                    </div>


                                    {/* MOTIVO */}

                                    <div>

                                        <span className="block text-xs uppercase text-gray-400 font-bold tracking-wider">

                                            Motivo

                                        </span>

                                        <span className="text-slate-700 font-medium">

                                            {movimentacao.motivo_movimentacao || "Não informado"}

                                        </span>

                                    </div>


                                    {/* ORIGEM */}

                                    <div>

                                        <span className="block text-xs uppercase text-gray-400 font-bold tracking-wider">

                                            Origem

                                        </span>

                                        <span className="text-slate-700 font-medium">

                                            {movimentacao.id_movimentacao_origem ?? "Sem origem"}

                                        </span>

                                    </div>

                                </div>

                            </section>


                            <section>

                                <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2 mb-5">

                                    <i className="pi pi-chart-bar text-orange-500"></i>

                                    Quantidade e Valor

                                </h2>


                                <div className="flex flex-col gap-5 border-l-2 border-orange-100 pl-4">


                                    {/* QUANTIDADE */}

                                    <div>

                                        <span className="block text-xs uppercase text-gray-400 font-bold tracking-wider">

                                            Quantidade

                                        </span>

                                        <span className="text-slate-700 font-medium">

                                            {movimentacao.quantidade}

                                        </span>

                                    </div>


                                    {/* PREÇO UNITÁRIO */}

                                    <div>

                                        <span className="block text-xs uppercase text-gray-400 font-bold tracking-wider">

                                            Preço Unitário

                                        </span>

                                        <span className="text-slate-700 font-medium">

                                            {Utilitario.formatarParaReal(movimentacao.preco_unitario ?? 0)}

                                        </span>

                                    </div>


                                    {/* VALOR TOTAL */}

                                    <div>

                                        <span className="block text-xs uppercase text-gray-400 font-bold tracking-wider">

                                            Valor Total

                                        </span>

                                        <span className="text-emerald-600 font-bold text-xl">

                                            {Utilitario.formatarParaReal(movimentacao.valor_total ?? 0)}

                                        </span>

                                    </div>


                                    {/* DATA DA MOVIMENTAÇÃO */}

                                    <div>

                                        <span className="block text-xs uppercase text-gray-400 font-bold tracking-wider">

                                            Data da Movimentação

                                        </span>

                                        <span className="text-slate-700 font-medium">

                                            {movimentacao.data_movimentacao
                                                ? Utilitario.formatarData(movimentacao.data_movimentacao)
                                                : "Não informada"
                                            }

                                        </span>

                                    </div>

                                </div>

                            </section>

                        </div>


                        <div className="mt-6">

                            <h2 className="text-lg font-bold text-slate-800 mb-3">

                                Observação

                            </h2>

                            <p className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-slate-700">

                                {movimentacao.observacao || "Nenhuma observação informada."}

                            </p>

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
                                `/atualizar/movimentacao/${movimentacao.id_movimentacao}`
                            )
                        }
                        className="w-full bg-slate-700 hover:bg-slate-600 text-white px-4 py-3 rounded-md font-bold transition-all shadow-md active:scale-95"
                    >

                        <i className="pi pi-pencil mr-2"></i>

                        Editar Movimentação

                    </button>


                    <button
                        type="button"
                        onClick={() =>
                            navigate("/lista/movimentacoes")
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

export default DetalhesMovimentacao;