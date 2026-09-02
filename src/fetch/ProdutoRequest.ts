import type { ProdutoDTO } from "../dto/ProdutoDTO";

class ProdutoRequests {

    private endpoint: string;

    constructor() {
        this.endpoint = "http://localhost:3333/api/produtos";
    }

    private normalizarProduto(produto: any): ProdutoDTO {
        return {
            idProduto: produto.idProduto || produto.id_produto,
            idCategoria: produto.idCategoria || produto.id_categoria,
            codigo: produto.codigo,
            nome: produto.nome,
            descricao: produto.descricao,
            preco_unitario: produto.preco_unitario,
            quantidade_disponivel: produto.quantidade_disponivel,
            quantidade_minima: produto.quantidade_minima,
            ativo: produto.ativo,
            data_cadastro: produto.data_cadastro
        };
    }

    async criar(produto: ProdutoDTO) {
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
                    body: JSON.stringify(produto)
                }
            );

            if (!response.ok) {
                const corpo = await response.text();
                let mensagem = "Erro ao cadastrar produto.";

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
                return dados.map((produto: any) => this.normalizarProduto(produto));
            }
            
            return [];

        } catch (error) {
            console.error(error);
            return [];
        }
    }
    async obterProdutoPorId(id: number) {

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
                throw new Error("Produto não encontrado.");
            }

            const dados = await response.json();
            return this.normalizarProduto(dados);

        } catch (error) {

            console.error(
                "Erro ao buscar produto por ID:",
                error
            );

            throw error;
        }
    }
}

export default new ProdutoRequests();