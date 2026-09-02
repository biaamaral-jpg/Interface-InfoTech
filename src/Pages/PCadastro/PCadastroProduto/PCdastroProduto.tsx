import { useState, useEffect, type JSX } from "react";
import Navegacao from "../../../components/Navegacao/Navegacao";
import Rodape from "../../../components/Rodape/Rodape";
import FormProduto from "../../../components/Formularios/FormProduto/FormProduto";

// Interface para tipar os produtos listados
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

function PCadastroProduto(): JSX.Element {
  const [produtos, setProdutos] = useState<IProduto[]>([]);

  // Função para buscar a lista atualizada do backend
  const carregarProdutos = async () => {
    try {
      const resposta = await fetch("http://localhost:3333/api/produtos");
      if (resposta.ok) {
        const dados = await resposta.json();
        setProdutos(dados);
      }
    } catch (error) {
      console.error("Erro ao buscar a lista de produtos:", error);
    }
  };

  // Carrega os produtos assim que a página abre
  useEffect(() => {
    carregarProdutos();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navegacao />
      
      {/* Passamos a lista e a função de atualizar para o formulário/listagem */}
      <FormProduto 
        produtos={produtos} 
        onSuccess={carregarProdutos} 
      />
      
      <Rodape />
    </div>
  );
}

export default PCadastroProduto;