import { useState, useEffect, type JSX } from "react";
import Navegacao from "../../../components/Navegacao/Navegacao";
import Rodape from "../../../components/Rodape/Rodape";
import FormCategoria from "../../../components/Formularios/FormCategoria/FormCategoria";
import { API_URL } from '../../../config/api';

// Interface para tipar os produtos listados
interface IProduto {
  id_categoria: number;
  nome: string;
  descricao: string;
  ativo: boolean;
  data_cadastro: Date | string;
}

function PCadastroCategoria(): JSX.Element {
  const [categorias, setCategorias] = useState<IProduto[]>([]);

  // Função para buscar a lista atualizada do backend
  const carregarCategorias = async () => {
    try {
      const resposta = await fetch(`${API_URL}/api/categorias`);
      if (resposta.ok) {
        const dados = await resposta.json();
        setCategorias(dados);
      }
    } catch (error) {
      console.error("Erro ao buscar a lista de categorias:", error);
    }
  };

  // Carrega os produtos assim que a página abre
  useEffect(() => {
    carregarCategorias();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navegacao />
      
      {/* Passamos a lista e a função de atualizar para o formulário/listagem */}
      <FormCategoria 
        categorias={categorias} 
        onSuccess={carregarCategorias} 
      />
      
      <Rodape />
    </div>
  );
}

export default PCadastroCategoria;