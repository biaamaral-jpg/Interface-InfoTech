import React, { useState } from "react";
import ProdutoRequests from "../../../fetch/ProdutoRequest";

interface IProduto {
  id_produto: number;
  id_categoria: number;
  codigo: string;
  nome: string;
  descricao: string;
  preco_unitario: number;
  quantidade_disponivel: number;
  quantidade_minima: number;
  ativo: boolean;
}

interface FormProdutoProps {
  produtos?: IProduto[];
  onSuccess?: () => void;
}

interface FormData {
  id_categoria: number;
  codigo: string;
  nome: string;
  descricao: string;
  preco_unitario: string | number;
  quantidade_disponivel: string | number;
  quantidade_minima: string | number;
  ativo: boolean;
}

export default function FormProduto({ produtos = [], onSuccess }: FormProdutoProps) {
  const [formData, setFormData] = useState<FormData>({
    id_categoria: 1,
    codigo: "",
    nome: "",
    descricao: "",
    preco_unitario: "",
    quantidade_disponivel: "",
    quantidade_minima: "",
    ativo: true,
  });
  const [erroTela, setErroTela] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    let val: string | number | boolean = value;

    if (type === "checkbox") {
      val = (e.target as HTMLInputElement).checked;
    } else if (type === "number") {
      val = value === "" ? "" : Number(value);
    } else if (name === "id_categoria") {
      val = Number(value);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: val,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Formulário enviado:", formData);
    setErroTela(null);

    if (!formData.codigo.trim() || !formData.nome.trim()) {
      const erroValidacao = "Por favor, preencha o Código e o Nome do produto.";
      console.error("Erro de validação:", erroValidacao, formData);
      setErroTela(`Erro ao cadastrar: ${erroValidacao}`);
      return;
    }

    const precoInformado = String(formData.preco_unitario)
      .replace(/R\$\s*/g, "")
      .replace(",", ".");
    const payload = {
      ...formData,
      idCategoria: Number(formData.id_categoria),
      preco_unitario: Number(precoInformado),
      quantidade_disponivel: Number(formData.quantidade_disponivel),
      quantidade_minima: Number(formData.quantidade_minima),
    };

    try {
      console.log("Payload enviado:", payload);
      const resposta = await ProdutoRequests.criar(payload);
      console.log("Resposta do servidor:", resposta);

      if (!resposta) {
        throw new Error(
          "O servidor recusou o cadastro. Verifique se o Código do produto já existe no banco!"
        );
      }

      alert("Produto cadastrado com sucesso!");
      setFormData({
        id_categoria: 1,
        codigo: "",
        nome: "",
        descricao: "",
        preco_unitario: "",
        quantidade_disponivel: "",
        quantidade_minima: "",
        ativo: true,
      });

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error("Erro ao cadastrar produto:", error);
      const erroApi = error as {
        response?: { data?: { message?: string } };
        message?: string;
      };
      setErroTela(
        "Erro ao cadastrar: " +
        (erroApi.response?.data?.message || erroApi.message || "Erro desconhecido")
      );
    }
  };

  return (
    <div>
      <div className="product-form-wrapper">
        <div className="product-form-card">
          <h2>Cadastro de Produtos</h2>

          {erroTela && (
            <div className="product-form-error">
              {erroTela}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="product-form-section">
              <div className="product-form-group">
                <label>Categoria:</label>
                <select
                  name="id_categoria"
                  value={formData.id_categoria}
                  onChange={handleChange}
                >
                  <option value={1}>Periféricos</option>
                  <option value={2}>Hardware</option>
                </select>
              </div>

              <div className="product-form-group">
                <label>Código:</label>
                <input
                  type="text"
                  name="codigo"
                  value={formData.codigo}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="product-form-section full">
              <div className="product-form-group">
                <label>Nome do produto:</label>
                <input
                  type="text"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="product-form-section full">
              <div className="product-form-group">
                <label>Descrição:</label>
                <textarea
                  name="descricao"
                  value={formData.descricao}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="product-form-section">
              <div className="product-form-group">
                <label>Preço unitário (R$):</label>
                <input
                  type="number"
                  step="0.01"
                  name="preco_unitario"
                  value={formData.preco_unitario}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      preco_unitario: e.target.value === "" ? "" : parseFloat(e.target.value),
                    })
                  }
                  required
                />
              </div>

              <div className="product-form-group">
                <label>Quantidade disponível:</label>
                <input
                  type="number"
                  name="quantidade_disponivel"
                  value={formData.quantidade_disponivel}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      quantidade_disponivel: e.target.value === "" ? "" : parseInt(e.target.value, 10),
                    })
                  }
                  required
                />
              </div>
            </div>

            <div className="product-form-section">
              <div className="product-form-group">
                <label>Quantidade mínima:</label>
                <input
                  type="number"
                  name="quantidade_minima"
                  value={formData.quantidade_minima}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      quantidade_minima: e.target.value === "" ? "" : parseInt(e.target.value, 10),
                    })
                  }
                  required
                />
              </div>

              <div className="product-form-group">
                <label>Status:</label>
                <select
                  name="ativo"
                  value={formData.ativo ? "1" : "0"}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      ativo: e.target.value === "1",
                    })
                  }
                >
                  <option value="1">Ativo</option>
                  <option value="0">Inativo</option>
                </select>
              </div>
            </div>

            <div className="product-form-actions">
              <button
                type="submit"
                className="product-btn-submit"
              >
                Cadastrar Produto
              </button>
              <button
                type="reset"
                className="product-btn-reset"
                onClick={() =>
                  setFormData({
                    id_categoria: 1,
                    codigo: "",
                    nome: "",
                    descricao: "",
                    preco_unitario: "",
                    quantidade_disponivel: "",
                    quantidade_minima: "",
                    ativo: true,
                  })
                }
              >
                Limpar
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Exibição da Lista */}
      {produtos.length > 0 && (
        <section className="produtos-cadastrados">
          <h3>Produtos Cadastrados ({produtos.length})</h3>
          <div className="produtos-grid">
            {produtos.map((item, index) => (
              <div key={item.id_produto || index} className="product-card">
                <h4>{item.nome}</h4>
                <p><strong>Código:</strong> {item.codigo}</p>
                <p>{item.descricao || "Sem descrição."}</p>
                <div className="product-card-price">R$ {Number(item.preco_unitario || 0).toFixed(2)}</div>
                <p><strong>Estoque:</strong> {item.quantidade_disponivel ?? 0} un.</p>
                <p><strong>Mínimo:</strong> {item.quantidade_minima ?? 0} un.</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}