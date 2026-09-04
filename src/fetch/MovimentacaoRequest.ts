import type MovimentacaoDTO  from "../dto/MovimentacaoDTO";

class MovimentacaoRequests {

    private endpoint: string;

    constructor() {
        this.endpoint = "http://localhost:3333/api/produtos";
    }

    private normalizarMovimentacao(movimentacao: any): MovimentacaoDTO {
        return {
            id_movimentacao: movimentacao.id_movimentacao || movimentacao.id_produto,
            id_produto: movimentacao.id_produto,
            id_movimentacao_origem: movimentacao.id_movimentacao_origem,
            motivo_movimentacao: movimentacao.motivo_movimentacao,
            tipo_movimentacao: movimentacao.tipo_movimentacao,
            valor_total: movimentacao.valor_total,
            quantidade: movimentacao.quantidade,
            preco_unitario: movimentacao.preco_unitario,
            observacao: movimentacao.observacao,
            data_movimentacao: movimentacao.data_movimentacao,
            ativo: movimentacao.ativo,
        };
    }

    async criar(movimentacao: MovimentacaoDTO) {
        try {

            const token = localStorage.getItem("token");

            const response = await fetch(
                this.endpoint,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify(movimentacao)
                }
            );

            if (!response.ok) {
                const corpo = await response.text();
                let mensagem = "Erro ao cadastrar movimentacao.";

                if (corpo) {
                    try {
                        const dados = JSON.parse(corpo) as {
                            message?: string;
                            error?: string;
                            detail?: string;
                        };
                        mensagem = dados.message ?? dados.error ?? dados.detail ?? corpo;
                    } catch {
                        mensagem = corpo;
                    }
                }

                throw Object.assign(new Error(mensagem), {
                    status: response.status,
                });
            }

            return true;

        } catch (error) {
            console.error("Erro na requisição de cadastro:", error);
            throw error;
        }
    }

    async listar() {
        try {

            const token = localStorage.getItem("token");

            const response = await fetch(
                this.endpoint,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                }
            );

            const dados = await response.json();
            
            if (Array.isArray(dados)) {
                return dados.map((movimentacao: any) => this.normalizarMovimentacao(movimentacao));
            }
            
            return [];

        } catch (error) {
            console.error(error);
            return [];
        }
    }
    async obterMovimentacaoPorId(id: number) {

        try {

            const token = localStorage.getItem("token");

            const response = await fetch(
                `${this.endpoint}/${id}`,
                {
                    method: "GET",

                    headers: {
                        "Content-Type": "application/json",
                        ...(token
                            ? {
                                Authorization: `Bearer ${token}`
                            }
                            : {})
                    }
                }
            );

            if (!response.ok) {
                throw new Error("Movimentação não encontrada.");
            }

            const dados = await response.json();
            return this.normalizarMovimentacao(dados);

        } catch (error) {

            console.error(
                "Erro ao buscar movimentacao por ID:",
                error
            );

            throw error;
        }
    }
}

export default new MovimentacaoRequests();