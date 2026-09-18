import type MovimentacaoDTO  from "../dto/MovimentacaoDTO";

class MovimentacaoRequests {

    private endpoints: string[];

    constructor() {
        this.endpoints = [
            "http://localhost:3333/api/movimentacoes",
            "http://localhost:3333/api/movimentacao",
            "http://localhost:3333/movimentacoes",
            "http://localhost:3333/movimentacao"
        ];
    }

    private getEndpointComFallback() {
        return this.endpoints[0];
    }

    private async fetchComFallback<T>(
        method: string,
        body?: any,
        id?: number
    ): Promise<Response | null> {
        let ultimoErro: any = null;

        for (const endpoint of this.endpoints) {
            const url = id !== undefined ? `${endpoint}/${id}` : endpoint;

            try {
                const token = localStorage.getItem("token");
                const response = await fetch(url, {
                    method,
                    headers: {
                        "Content-Type": "application/json",
                        ...(token ? { Authorization: `Bearer ${token}` } : {}),
                    },
                    ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
                });

                if (response.status !== 404) {
                    return response;
                }

                ultimoErro = new Error(`Rota não encontrada em ${url}`);
            } catch (error) {
                ultimoErro = error;
            }
        }

        if (ultimoErro) {
            throw ultimoErro;
        }

        return null;
    }

    private normalizarMovimentacao(movimentacao: any): MovimentacaoDTO {
        return {
            id_movimentacao: movimentacao.id_movimentacao ?? movimentacao.idMovimentacao ?? 0,
            idMovimentacao: movimentacao.idMovimentacao ?? movimentacao.id_movimentacao ?? 0,
            id_produto: movimentacao.id_produto ?? movimentacao.idProduto ?? 0,
            idProduto: movimentacao.idProduto ?? movimentacao.id_produto ?? 0,
            id_movimentacao_origem: movimentacao.id_movimentacao_origem ?? movimentacao.idMovimentacaoOrigem,
            idMovimentacaoOrigem: movimentacao.idMovimentacaoOrigem ?? movimentacao.id_movimentacao_origem,
            motivo_movimentacao: movimentacao.motivo_movimentacao ?? movimentacao.motivoMovimentacao,
            motivoMovimentacao: movimentacao.motivoMovimentacao ?? movimentacao.motivo_movimentacao,
            tipo_movimentacao: movimentacao.tipo_movimentacao ?? movimentacao.tipoMovimentacao,
            tipoMovimentacao: movimentacao.tipoMovimentacao ?? movimentacao.tipo_movimentacao,
            valor_total: movimentacao.valor_total ?? movimentacao.valorTotal,
            valorTotal: movimentacao.valorTotal ?? movimentacao.valor_total,
            quantidade: movimentacao.quantidade,
            preco_unitario: movimentacao.preco_unitario ?? movimentacao.precoUnitario,
            precoUnitario: movimentacao.precoUnitario ?? movimentacao.preco_unitario,
            observacao: movimentacao.observacao,
            data_movimentacao: movimentacao.data_movimentacao ?? movimentacao.dataMovimentacao,
            dataMovimentacao: movimentacao.dataMovimentacao ?? movimentacao.data_movimentacao,
            ativo: movimentacao.ativo,
        };
    }

    async criar(movimentacao: MovimentacaoDTO) {
        try {
            const response = await this.fetchComFallback("POST", movimentacao);

            if (!response) {
                throw new Error("Não foi possível conectar ao backend de movimentações. Verifique se o servidor está rodando na porta 3333 e se a rota /api/movimentacoes existe.");
            }

            if (!response.ok) {
                const corpo = await response.text();
                let mensagem = "Erro ao cadastrar movimentação.";

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

                if (mensagem.includes("Cannot POST") || mensagem.includes("Not Found") || mensagem.includes("404")) {
                    throw new Error("Rota da movimentação não encontrada no backend. Verifique a URL da API e se a rota POST está registrada.");
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
            const response = await this.fetchComFallback("GET");

            if (!response) {
                return [];
            }

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
            const response = await this.fetchComFallback("GET", undefined, id);

            if (!response) {
                throw new Error("Movimentação não encontrada. Verifique a rota do backend.");
            }

            if (!response.ok) {
                throw new Error("Movimentação não encontrada.");
            }

            const dados = await response.json();
            return this.normalizarMovimentacao(dados);

        } catch (error) {
            console.error("Erro ao buscar movimentacao por ID:", error);
            throw error;
        }
    }
}

export default new MovimentacaoRequests();