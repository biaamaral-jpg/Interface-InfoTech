import { API_URL } from '../config/api';

class CategoriaRequests {
    private endpoints: string[];

    constructor() {
        this.endpoints = [
            `${API_URL}/api/categorias`,
            `${API_URL}/api/categoria`,
            `${API_URL}/categorias`,
            `${API_URL}/categoria`,
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

    private normalizarCategoria(categoria: any) {
        const idCategoria =
            categoria.id_categoria ?? categoria.idCategoria ?? categoria.id ?? null;

        return {
            id_categoria: idCategoria,
            idCategoria,
            nome: categoria.nome ?? "",
            descricao: categoria.descricao ?? "",
            ativo: categoria.ativo ?? true,
            data_cadastro: categoria.data_cadastro,
        };
    }

    async criar(categoria: any) {
        try {
            const payload = {
                ...categoria,
                id_categoria: categoria.id_categoria ?? categoria.idCategoria ?? categoria.id,
                idCategoria: categoria.idCategoria ?? categoria.id_categoria ?? categoria.id,
                nome: String(categoria.nome ?? "").trim(),
                descricao: String(categoria.descricao ?? "").trim(),
                ativo: Boolean(categoria.ativo),
            };

            const response = await this.fetchComFallback("POST", payload);

            if (!response) {
                throw new Error(
                    "Não foi possível conectar ao backend de categorias. Verifique se o servidor está rodando na porta 3333 e se a rota /api/categorias existe."
                );
            }

            if (!response.ok) {
                const corpo = await response.text();
                let mensagem = "Erro ao cadastrar categoria.";

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

                if (
                    mensagem.includes("Cannot POST") ||
                    mensagem.includes("Not Found") ||
                    mensagem.includes("404")
                ) {
                    throw new Error(
                        "Rota da categoria não encontrada no backend. Verifique a URL da API e se a rota POST está registrada."
                    );
                }

                throw Object.assign(new Error(mensagem), {
                    status: response.status,
                });
            }

            return true;
        } catch (error) {
            console.error("Erro na requisição de cadastro de categoria:", error);
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
                return dados.map((c: any) => this.normalizarCategoria(c));
            }

            return [];
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    async obterCategoriaPorId(id: number) {
        try {
            const response = await this.fetchComFallback("GET", undefined, id);

            if (!response) {
                throw new Error("Categoria não encontrada. Verifique a rota do backend.");
            }

            if (!response.ok) {
                throw new Error("Categoria não encontrada.");
            }

            const dados = await response.json();
            return this.normalizarCategoria(dados);
        } catch (error) {
            console.error("Erro ao buscar categoria por ID:", error);
            throw error;
        }
    }
}

export default new CategoriaRequests();
