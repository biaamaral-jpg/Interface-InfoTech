class CategoriaRequests {
    private endpoint: string;

    constructor() {
        this.endpoint = "http://localhost:3333/api/categorias";
    }

    private normalizarCategoria(categoria: any) {
        return {
            idCategoria: categoria.idCategoria || categoria.id_categoria,
            nome: categoria.nome,
            descricao: categoria.descricao,
            ativo: categoria.ativo,
            data_cadastro: categoria.data_cadastro,
        };
    }

    async criar(categoria: any) {
        try {
            const token = localStorage.getItem("token");

            const response = await fetch(this.endpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(categoria),
            });

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
            const token = localStorage.getItem("token");

            const response = await fetch(this.endpoint, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

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
            const token = localStorage.getItem("token");

            const response = await fetch(`${this.endpoint}/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    ...(token ? { Authorization: `Bearer ${token}` } : {}),
                },
            });

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
