import React, { useState } from "react";
import CategoriaRequests from "../../../fetch/CategoriaRequest";

interface ICategoria {
  id_categoria?: number;
  idCategoria?: number;
  nome: string;
  descricao?: string;
  ativo?: boolean;
}

interface FormCategoriaProps {
  categorias?: ICategoria[];
  onSuccess?: () => void;
}

interface FormData {
  nome: string;
  descricao: string;
  ativo: boolean;
}

export default function FormCategoria({ categorias = [], onSuccess }: FormCategoriaProps) {
  const [formData, setFormData] = useState<FormData>({
    nome: "",
    descricao: "",
    ativo: true,
  });
  const [erroTela, setErroTela] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    let val: string | boolean = value;

    if (type === "checkbox") {
      val = (e.target as HTMLInputElement).checked;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: val,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErroTela(null);

    if (!formData.nome.trim()) {
      const erroValidacao = "Por favor, preencha o Nome da categoria.";
      console.error("Erro de validação:", erroValidacao, formData);
      setErroTela(`Erro ao cadastrar: ${erroValidacao}`);
      return;
    }

    const payload = {
      nome: formData.nome,
      descricao: formData.descricao,
      ativo: formData.ativo,
    };

    try {
      const resposta = await CategoriaRequests.criar(payload);

      if (!resposta) {
        throw new Error("O servidor recusou o cadastro de categoria.");
      }

      alert("Categoria cadastrada com sucesso!");
      setFormData({ nome: "", descricao: "", ativo: true });

      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Erro ao cadastrar categoria:", error);
      const erroApi = error as {
        response?: { data?: { message?: string } };
        message?: string;
      };
      setErroTela(
        "Erro ao cadastrar: " + (erroApi.response?.data?.message || erroApi.message || "Erro desconhecido")
      );
    }
  };

  return (
    <div>
      <div className="product-form-wrapper">
        <div className="product-form-card">
          <h2>Cadastro de Categorias</h2>

          {erroTela && <div className="product-form-error">{erroTela}</div>}

          <form onSubmit={handleSubmit}>
            <div className="product-form-section full">
              <div className="product-form-group">
                <label>Nome da categoria:</label>
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
                <textarea name="descricao" value={formData.descricao} onChange={handleChange} />
              </div>
            </div>

            <div className="product-form-section">
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
              <button type="submit" className="product-btn-submit">
                Cadastrar Categoria
              </button>
              <button
                type="reset"
                className="product-btn-reset"
                onClick={() => setFormData({ nome: "", descricao: "", ativo: true })}
              >
                Limpar
              </button>
            </div>
          </form>
        </div>
      </div>

      {categorias.length > 0 && (
        <section className="produtos-cadastrados">
          <h3>Categorias Cadastradas ({categorias.length})</h3>
          <div className="produtos-grid">
            {categorias.map((item, index) => (
              <div key={item.id_categoria || item.idCategoria || index} className="product-card">
                <h4>{item.nome}</h4>
                <p>{item.descricao || "Sem descrição."}</p>
                <p><strong>Status:</strong> {item.ativo ? "Ativo" : "Inativo"}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
